"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const app_1 = require("./app");
const socket_1 = require("./socket");
app_1.appFactory()
    .then((app) => {
    const port = process.env.port || 3000;
    const server = app.listen(port, () => {
        console.log(`on port ${port}`);
    });
    const io = socket_io_1.default(server);
    io.on('connection', socket_1.socketioFactory(io));
})
    .catch((err) => {
    console.error(err);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsMERBQWdDO0FBQ2hDLCtCQUFrQztBQUNsQyxxQ0FBMEM7QUFHMUMsZ0JBQVUsRUFBRTtLQUNWLElBQUksQ0FBQyxDQUFDLEdBQVksRUFBRSxFQUFFO0lBQ3RCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQTtJQUVyQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUE7SUFDL0IsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLEVBQUUsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzNCLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLHdCQUFlLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUM7S0FDRCxLQUFLLENBQUMsQ0FBQyxHQUFZLEVBQUUsRUFBRTtJQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ25CLENBQUMsQ0FBQyxDQUFBIn0=