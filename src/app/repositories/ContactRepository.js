const db = require('../../database');

class ContactRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return row;
  }

  async findByCpf(cpf) {
    const [row] = await db.query('SELECT * FROM contacts WHERE cpf = $1', [cpf]);
    return row;
  }

  async findByRg(rg) {
    const [row] = await db.query('SELECT * FROM contacts WHERE rg = $1', [rg]);
    return row;
  }

  async create({
    name, cpf, rg, cep, rua, bairro, numero, complemento, cidade, estado, category_id,
  }) {
    const [row] = await db.query(`
    INSERT INTO contacts(name, cpf, rg, cep, rua, bairro, numero, complemento, cidade, estado, category_id )
    VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11  )
    RETURNING *
    `, [name, cpf, rg, cep, rua, bairro, numero, complemento, cidade, estado, category_id]);
    return row;
  }

  async update(id, {
    name, cpf, rg, cep, rua, bairro, numero, complemento, cidade, estado, category_id,
  }) {
    const [row] = await db.query(`
    UPDATE contacts
    SET name = $1, cpf = $2, rg = $3, cep = $4, rua = $5, bairro = $6, numero = $7, complemento = $8, cidade = $9, estado = $10, category_id = $11
    WHERE id = $12
    RETURNING *
    `, [name, cpf, rg, cep, rua, bairro, numero, complemento, cidade, estado, category_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOp;
  }
}
module.exports = new ContactRepository();
