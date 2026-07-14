import type { MedusaContainer } from '@medusajs/framework'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'
import {
  createServiceZonesWorkflow,
  createShippingOptionsWorkflow,
} from '@medusajs/medusa/core-flows'

type ScriptArgs = {
  container: MedusaContainer
}

const MALAYSIA_COUNTRY_CODE = 'my'
const MALAYSIA_FULFILLMENT_SET = 'CLEF Marketing shipping'
const MALAYSIA_OPTION_CODE = 'clef-malaysia-standard'

export default async function setupMalaysiaShipping({ container }: ScriptArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: stockLocations } = await query.graph({
    entity: 'stock_location',
    fields: ['id', 'name', 'fulfillment_providers.*'],
    filters: {
      name: 'CLEF Marketing',
    },
  })
  const stockLocation = stockLocations.find(
    (location) => location.name === 'CLEF Marketing',
  )

  if (!stockLocation?.id) {
    throw new Error('The existing CLEF Marketing stock location could not be found.')
  }

  const manualProviderEnabled = stockLocation.fulfillment_providers?.some(
    (provider) => provider?.id === 'manual_manual',
  )

  if (!manualProviderEnabled) {
    await link.create({
      [Modules.STOCK_LOCATION]: {
        stock_location_id: stockLocation.id,
      },
      [Modules.FULFILLMENT]: {
        fulfillment_provider_id: 'manual_manual',
      },
    })
    logger.info('Enabled the manual fulfillment provider for CLEF Marketing.')
  }

  const { data: fulfillmentSets } = await query.graph({
    entity: 'fulfillment_set',
    fields: [
      'id',
      'name',
      'type',
      'service_zones.*',
      'service_zones.geo_zones.*',
    ],
    filters: {
      name: MALAYSIA_FULFILLMENT_SET,
    },
  })
  const fulfillmentSet = fulfillmentSets.find(
    (set) => set.name === MALAYSIA_FULFILLMENT_SET && set.type === 'shipping',
  )

  if (!fulfillmentSet) {
    throw new Error(
      `Missing fulfillment set: ${MALAYSIA_FULFILLMENT_SET}. Configure the existing CLEF Marketing location first.`,
    )
  }

  let serviceZoneId = fulfillmentSet.service_zones?.find((zone) =>
    zone.geo_zones?.some(
      (geoZone) => geoZone.country_code?.toLowerCase() === MALAYSIA_COUNTRY_CODE,
    ),
  )?.id

  if (!serviceZoneId) {
    const { result } = await createServiceZonesWorkflow(container).run({
      input: {
        data: [
          {
            name: 'Malaysia',
            fulfillment_set_id: fulfillmentSet.id,
            geo_zones: [
              {
                type: 'country',
                country_code: MALAYSIA_COUNTRY_CODE,
              },
            ],
          },
        ],
      },
    })
    serviceZoneId = result[0]?.id
    logger.info('Created the Malaysia service zone for CLEF Marketing shipping.')
  }

  if (!serviceZoneId) {
    throw new Error('Medusa did not return a Malaysia service-zone ID.')
  }

  const { data: existingOptions } = await query.graph({
    entity: 'shipping_option',
    fields: ['id', 'name', 'service_zone_id', 'type.*'],
    filters: {
      service_zone_id: serviceZoneId,
    },
  })
  const optionExists = existingOptions.some(
    (option) => option.type?.code === MALAYSIA_OPTION_CODE,
  )

  if (optionExists) {
    logger.info('Malaysia standard shipping already exists; no changes were needed.')
    return
  }

  const { data: shippingProfiles } = await query.graph({
    entity: 'shipping_profile',
    fields: ['id', 'name', 'type'],
    filters: {
      type: 'default',
    },
  })
  const shippingProfile = shippingProfiles[0]

  if (!shippingProfile?.id) {
    throw new Error('The Default Shipping Profile could not be found.')
  }

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: 'Malaysia Standard Shipping',
        price_type: 'flat',
        provider_id: 'manual_manual',
        service_zone_id: serviceZoneId,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: 'Standard',
          description: 'Standard delivery within Malaysia.',
          code: MALAYSIA_OPTION_CODE,
        },
        prices: [
          {
            currency_code: 'myr',
            amount: 10,
          },
        ],
        rules: [
          {
            attribute: 'enabled_in_store',
            value: 'true',
            operator: 'eq',
          },
          {
            attribute: 'is_return',
            value: 'false',
            operator: 'eq',
          },
        ],
      },
    ],
  })

  logger.info('Created Malaysia Standard Shipping at RM10.00.')
}
