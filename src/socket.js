"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketioFactory = void 0;
function updateWatcher(watchers, watcher) {
    for (const w of watchers) {
        if (w.id === watcher.id) {
            w.lastUpdated = watcher.lastUpdated;
            w.currentTime = watcher.currentTime;
            return;
        }
    }
    watchers.push(watcher);
}
function pruneWatchers(watchers) {
    const currentDate = Date.now();
    for (let i = 0; i < watchers.length; ++i) {
        const w = watchers[i];
        // in milliseconds
        if (currentDate - w.lastUpdated > 1750) {
            watchers.splice(i, 1);
            return;
        }
    }
}
function getAverage(watchers) {
    let total = 0;
    for (const w of watchers) {
        total += w.currentTime;
    }
    if (total === null ||
        total === void 0 ||
        watchers.length === null ||
        watchers.length === void 0 ||
        globalThis.isNaN(total) ||
        globalThis.isNaN(watchers.length)) {
        return 0;
    }
    const average = total / watchers.length;
    if (globalThis.isNaN(average)) {
        return 0;
    }
    return average;
}
function socketioFactory(io) {
    const watchers = [];
    globalThis.setInterval(() => {
        console.table(watchers);
    }, 5000);
    globalThis.setInterval(() => {
        pruneWatchers(watchers);
        let average = getAverage(watchers);
        average = Math.round(average);
        // console.info('average')
        io.emit('new-average', String(average));
    }, 300);
    globalThis.setInterval(() => {
        io.emit('alll', JSON.stringify(watchers));
    }, 1000);
    return (client) => {
        client.on('new-current-time', (watcherString) => {
            const watcher = JSON.parse(watcherString);
            updateWatcher(watchers, watcher);
            // console.info(watchers)
            let ip = client.handshake.address;
            // console.info(ip)
        });
        client.on('disconnect', () => {
            console.info('disconnect');
        });
        client.on('connect', () => {
            console.info('connect');
        });
    };
}
exports.socketioFactory = socketioFactory;
function throttle(cb, limit) {
    var waiting = false;
    return function () {
        if (!waiting) {
            cb.apply(this, arguments);
            waiting = true;
            setTimeout(() => {
                waiting = false;
            }, limit);
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVFBLFNBQVMsYUFBYSxDQUFDLFFBQW1CLEVBQUUsT0FBZ0I7SUFDM0QsS0FBSyxNQUFNLENBQUMsSUFBSSxRQUFRLEVBQUU7UUFDekIsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDeEIsQ0FBQyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFBO1lBQ25DLENBQUMsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQTtZQUNuQyxPQUFNO1NBQ047S0FDRDtJQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDdkIsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLFFBQW1CO0lBQ3pDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtRQUN6QyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFckIsa0JBQWtCO1FBQ2xCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFO1lBQ3ZDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3JCLE9BQU07U0FDTjtLQUNEO0FBQ0YsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLFFBQW1CO0lBQ3RDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtJQUNiLEtBQUssTUFBTSxDQUFDLElBQUksUUFBUSxFQUFFO1FBQ3pCLEtBQUssSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFBO0tBQ3RCO0lBRUQsSUFDQyxLQUFLLEtBQUssSUFBSTtRQUNkLEtBQUss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