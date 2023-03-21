import { pool } from '../db.js'

export const ping = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT 1 + 1 AS result')
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}