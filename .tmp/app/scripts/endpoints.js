(function() {
  namespace('Config');

  Config.Endpoints = (function() {
    function Endpoints() {}

    Endpoints.authorization = "https://sandbox.smchcn.net/asrv/SMI/oauth/authorize";

    Endpoints.authorizationlogoff = 'https://sandbox.smchcn.net/asrv/signout';

    Endpoints.authorize_net = "https://test.authorize.net/gateway/transact.dll";

    Endpoints.church = "https://sandbox.smchcn.net/smi/api/enrollmentchurch";

    Endpoints.demographics = "https://sandbox.smchcn.net/smi/api/enrollmentsurvey";

    Endpoints.enrollment = "https://sandbox.smchcn.net/smi/api/enrollment";

    Endpoints.enrollment_app = "https://localhost:8004";

    Endpoints.enrollment_callback = "https://localhost:8004/#/enroll-callback";

    Endpoints.payment = "https://sandbox.smchcn.net/smi/api/payment";

    Endpoints.person = "https://sandbox.smchcn.net/smi/api/person";

    Endpoints.platform = "https://localhost:9000";

    Endpoints.referrers = 'https://sandbox.smchcn.net/smi/api/Referrals';

    Endpoints.saveToSharePricing = 'https://sandbox.smchcn.net/smi/api/savetosharepricing';

    Endpoints.smi = "https://sandbox.smchcn.net/smi";

    Endpoints.subscriptionRate = 'https://sandbox.smchcn.net/smi/api/subscriptionrate';

    Endpoints.utility = 'https://sandbox.smchcn.net/smi/api/utility';

    return Endpoints;

  })();

}).call(this);
