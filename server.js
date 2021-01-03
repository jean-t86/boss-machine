/**
 * The Server class used to wrap around and configure an http.server created
 * when an Express application starts listening for incoming requests.
 */
class Server {
  /**
   * The Server class constructor
   * @param {core.Express} express The function to create an express
   * application
   */
  constructor(express) {
    this._app = express();
  }

  /**
   * Returns the Express application
   */
  get app() {
    return this._app;
  }

  /**
   * Sets the body parser for the server.
   * @param {Middleware} bodyParser Middleware that only parses a
   * specific Content-Type and only looks at requests where the header
   * matches the type otion.
   */
  setupBodyParser(bodyParser) {
    this._app.use(bodyParser());
  }

  /**
   * Sets the CORS policy on the server.
   * @param {Middleware} cors Middleware that sets the Cross-origin
   * Resource Sharing policy on the server.
   */
  setupCors(cors) {
    this._app.use(cors);
  }

  /**
   * Sets the morgan logger for the server.
   * @param {Middleware} morgan Middleware that logs every requests
   * received to the console.
   * @param {string} format The format of the message that gets logged.
   */
  setupMorgan(morgan, format) {
    this._app.use(morgan(format));
  }

  /**
   * Mounts a router on the route provided.
   * @param {string} route The route on which to mount the router.
   * @param {Middleware} router A router for the API.
   */
  mountRouter(route, router) {
    this._app.use(route, router);
  }
}

module.exports = Server;
