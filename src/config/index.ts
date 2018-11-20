declare var location: any;
export default {
    origin: location.origin + location.pathname,
    debug: location.port == 15587
}