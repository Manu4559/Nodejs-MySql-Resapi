import { pool } from "../db.js"

export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employees')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const getEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', id)
        if (rows.length <= 0) { return res.status(404).json({ message: 'Employee not found' }) }
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const createEmployee = async (req, res) => {
    try {
        const { name, salary } = req.body
        const [rows] = await pool.query('INSERT INTO employees (name, salary) VALUES (?, ?)', [name, salary])
        res.send({
            id: rows.insertId,
            name,
            salary
        })
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const updateEmployee = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body
    try {
        const [result] = await pool.query('UPDATE employees SET name = IFNULL(?, name), salary= IFNULL(?, salary) WHERE id = ?', [name, salary, id])
        if (result.affectedRows <= 0) { return res.status(404).json({ message: 'Employee not found' }) }
        const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', id)
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const deleteEmployee = async (req, res) => {
    const { id } = req.params
    try {
        const [result] = await pool.query('DELETE FROM employees WHERE id = ?', id)
        if (result.affectedRows <= 0) { return res.status(404).json({ message: 'Employee not found' }) }
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}