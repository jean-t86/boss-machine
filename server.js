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
}

module.exports = Server;
