import { Modules, ModuleProvider } from '@medusajs/framework/utils'

import ResendNotificationProviderService from './service'

export default ModuleProvider(Modules.NOTIFICATION, {
  services: [ResendNotificationProviderService],
})
