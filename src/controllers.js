"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fourOhFourController = exports.videoController = exports.aboutController = exports.homeController = exports.indexController = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const toml_1 = __importDefault(require("toml"));
function indexController(req, res) {
    res.redirect('/home');
}
exports.indexController = indexController;
async function homeController(req, res) {
    const file = path_1.default.join(__dirname, '../local/info.toml');
    const raw = await fs_1.default.promises.readFile(file);
    const data = toml_1.default.parse(raw.toString());
    res.render('pages/home', data);
}
exports.homeController = homeController;
function aboutController(req, res) {
    res.render('pages/about');
}
exports.aboutController = aboutController;
function videoController(req, res) {
    const file = path_1.default.join(__dirname, 'public/media/movie.mp4');
    fs_1.default.stat(file, (err, stats) => {
        if (err) {
            console.error(err);
            // 404 Error if file not found
            if (err.code === 'ENOENT') {
                return res.sendStatus(404);
            }
            res.end(err);
        }
        const range = req.headers.range;
        if (!range) {
            // 416 Wrong range
            return res.sendStatus(416);
        }
        const positions = range.replace(/bytes=/, '').split('-');
        const start = parseInt(positions[0], 10);
        const total = stats.size;
        const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        const chunksize = end - start + 1;
        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        });
        const stream = fs_1.default
            .createReadStream(file, { start, end })
            .on('open', () => {
            stream.pipe(res);
        })
            .on('error', (err) => {
            res.end(err);
        });
    });
}
exports.videoController = videoController;
function fourOhFourController(req, res) {
    res.render('pages/404');
}
exports.fourOhFourController = fourOhFourController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250cm9sbGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsZ0RBQXVCO0FBQ3ZCLGdEQUF1QjtBQUd2QixTQUFnQixlQUFlLENBQUMsR0FBWSxFQUFFLEdBQWE7SUFDMUQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUN0QixDQUFDO0FBRkQsMENBRUM7QUFFTSxLQUFLLFVBQVUsY0FBYyxDQUFDLEdBQVksRUFBRSxHQUFhO0lBQy9ELE1BQU0sSUFBSSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLENBQUE7SUFDdkQsTUFBTSxHQUFHLEdBQUcsTUFBTSxZQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM1QyxNQUFNLElBQUksR0FBRyxjQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQy9CLENBQUM7QUFMRCx3Q0FLQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxHQUFZLEVBQUUsR0FBYTtJQUMxRCxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQzFCLENBQUM7QUFGRCwwQ0FFQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxHQUFZLEVBQUUsR0FBYTtJQUMxRCxNQUFNLElBQUksR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFBO0lBQzNELFlBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzVCLElBQUksR0FBRyxFQUFFO1lBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNsQiw4QkFBOEI7WUFDOUIsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDMUIsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQzFCO1lBQ0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNaO1FBRUQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUE7UUFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNYLGtCQUFrQjtZQUNsQixPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDMUI7UUFDRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDeEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUN4QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFBO1FBQ3hCLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNqRSxNQUFNLFNBQVMsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUVqQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNsQixlQUFlLEVBQUUsUUFBUSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFLO1lBQzNELGVBQWUsRUFBRSxPQUFPO1lBQ3hCLGdCQUFnQixFQUFFLFNBQVM7WUFDM0IsY0FBYyxFQUFFLFdBQVc7U0FDM0IsQ0FBQyxDQUFBO1FBRUYsTUFBTSxNQUFNLEdBQUcsWUFBRTthQUNmLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQzthQUN0QyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNwQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2IsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNILENBQUM7QUF2Q0QsMENBdUNDO0FBRUQsU0FBZ0Isb0JBQW9CLENBQUMsR0FBWSxFQUFFLEdBQWE7SUFDL0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUN4QixDQUFDO0FBRkQsb0RBRUMifQ==