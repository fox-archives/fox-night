"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appFactory = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const c = __importStar(require("./controllers"));
const isDev = process.env.NODE_ENV === 'production';
async function appFactory() {
    dotenv_1.default.config();
    const app = express_1.default();
    app.set('views', path_1.default.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.set('case sensitive routing', true);
    app.set('etag', 'weak');
    app.set('json spaces', 2);
    app.set('query-parser', 'extended');
    app.set('strict routing', false);
    app.set('trust proxy', 'loopback');
    app.set('trust proxy', false);
    app.set('views', path_1.default.join(__dirname, 'views'));
    app.set('x-powered-by', false);
    app.use(express_session_1.default({
        secret: 'foobar',
        resave: false,
        saveUninitialized: false,
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({
        extended: true,
    }));
    app.use('/', express_1.default.static(path_1.default.join(__dirname, 'public')));
    app.get('/', c.indexController);
    app.get('/home', c.homeController);
    app.get('/about', c.aboutController);
    app.get('/video', c.videoController);
    app.use('/', c.fourOhFourController);
    return app;
}
exports.appFactory = appFactory;
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION');
    console.error(err);
});
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION');
    console.error(err);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBdUI7QUFDdkIsb0RBQTJCO0FBQzNCLHNEQUE2QjtBQUM3QixzRUFBcUM7QUFFckMsaURBQWtDO0FBRWxDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksQ0FBQTtBQUU1QyxLQUFLLFVBQVUsVUFBVTtJQUMvQixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBRWYsTUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFBO0lBQ3JCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDL0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDN0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN6QixHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUNuQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ2hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQ2xDLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDL0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFOUIsR0FBRyxDQUFDLEdBQUcsQ0FDTix5QkFBTyxDQUFDO1FBQ1AsTUFBTSxFQUFFLFFBQVE7UUFDaEIsTUFBTSxFQUFFLEtBQUs7UUFDYixpQkFBaUIsRUFBRSxLQUFLO0tBQ3hCLENBQUMsQ0FDRixDQUFBO0lBQ0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7SUFDdkIsR0FBRyxDQUFDLEdBQUcsQ0FDTixpQkFBTyxDQUFDLFVBQVUsQ0FBQztRQUNsQixRQUFRLEVBQUUsSUFBSTtLQUNkLENBQUMsQ0FDRixDQUFBO0lBQ0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsaUJBQU8sQ0FBQyxNQUFNLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRTVELEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUMvQixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDbEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ3BDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUNwQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtJQUVwQyxPQUFPLEdBQUcsQ0FBQTtBQUNYLENBQUM7QUF0Q0QsZ0NBc0NDO0FBRUQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3ZDLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtJQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ25CLENBQUMsQ0FBQyxDQUFBO0FBRUYsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3hDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ25CLENBQUMsQ0FBQyxDQUFBIn0=