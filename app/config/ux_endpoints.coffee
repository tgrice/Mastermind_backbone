namespace('Config')

class Config.Endpoints
  @authorization       = "https://sandbox.smchcn.net/asrv/SMI/oauth/authorize"
  @authorizationlogoff = 'https://sandbox.smchcn.net/asrv/signout'
  @authorize_net       = "https://test.authorize.net/gateway/transact.dll"
  @church              = "https://sandbox.smchcn.net/smi/api/enrollmentchurch"
  @demographics        = "https://sandbox.smchcn.net/smi/api/enrollmentsurvey"
  @enrollment          = "https://sandbox.smchcn.net/smi/api/enrollment"
  @enrollment_app      = "https://localhost:8004"
  @enrollment_callback = "https://localhost:8004/#/enroll-callback"
  @payment             = "https://sandbox.smchcn.net/smi/api/payment"
  @person              = "https://sandbox.smchcn.net/smi/api/person"
  @platform            = "https://localhost:9000"
  @referrers           = 'https://sandbox.smchcn.net/smi/api/Referrals'
  @saveToSharePricing  = 'https://sandbox.smchcn.net/smi/api/savetosharepricing'
  @smi                 = "https://sandbox.smchcn.net/smi"
  @subscriptionRate    = 'https://sandbox.smchcn.net/smi/api/subscriptionrate'
  @utility             = 'https://sandbox.smchcn.net/smi/api/utility'
