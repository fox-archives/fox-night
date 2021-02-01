import fs from 'fs'
import path from 'path'
import toml from 'toml'
import type { Request, Response } from 'express'

export function indexController(req: Request, res: Response) {
	res.redirect('/home')
}

export async function homeController(req: Request, res: Response) {
	const file = path.join(__dirname, '../local/info.toml')
	const raw = await fs.promises.readFile(file)
	const data = toml.parse(raw.toString())

	res.render('pages/home', {
		page: 'home',
		...data,
	})
}

export function aboutController(req: Request, res: Response) {
	res.render('pages/about', {
		page: 'about',
	})
}

export function videoController(req: Request, res: Response) {
	const file = path.join(__dirname, 'public/media/movie.mp4')
	fs.stat(file, (err, stats) => {
		if (err) {
			console.error(err)
			// 404 Error if file not found
			if (err.code === 'ENOENT') {
				return res.sendStatus(404)
			}
			res.end(err)
		}

		const range = req.headers.range
		if (!range) {
			// 416 Wrong range
			return res.sendStatus(416)
		}
		const positions = range.replace(/bytes=/, '').split('-')
		const start = parseInt(positions[0], 10)
		const total = stats.size
		const end = positions[1] ? parseInt(positions[1], 10) : total - 1
		const chunksize = end - start + 1

		res.writeHead(206, {
			'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': 'video/mp4',
		})

		const stream = fs
			.createReadStream(file, { start, end })
			.on('open', () => {
				stream.pipe(res)
			})
			.on('error', (err) => {
				res.end(err)
			})
	})
}

export function fourOhFourController(req: Request, res: Response) {
	res.render('pages/404', {
		page: '404',
	})
}
