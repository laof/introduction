const config = require('../../build/port.json');
declare var location: any;
export default {
    origin: location.origin + location.pathname,
    debug: location.port == config.port
}