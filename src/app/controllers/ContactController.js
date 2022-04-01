const { response } = require('express');
const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    // Listar Todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);

    response.json(contacts);
  }

  // Obter um registro
  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }// 404: Not Found

    response.json(contact);
  }

  // Criar novo registro
  async store(request, response) {
    const {
      name, cpf, rg, cep, rua, bairro, numero, complemento, cidade, estado,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Inserir Nome' });
    }

    if (!cpf) {
      return response.status(400).json({ error: 'Inserir cpf' });
    }

    const contactExist = await ContactRepository.findByCpf(cpf);

    if (contactExist) {
      return response.status(400).json({ error: 'Cpf Já cadastrado' });
    }

    if (!rg) {
      return response.status(400).json({ error: 'Inserir RG' });
    }
    const rgExist = await ContactRepository.findByRg(rg);

    if (rgExist) {
      return response.status(400).json({ error: 'RG Já cadastrado' });
    }

    const contact = await ContactRepository.create({
      name, cpf, rg, cep, rua, bairro, numero, complemento, cidade, estado,
    });

    response.json(contact);
  }

  // Editar um registro
  async update(request, response) {
    const { id } = request.params;
    const {
      name, cpf, rg, cep, rua, bairro, numero, complemento, cidade, estado,
    } = request.body;

    const contactExists = await ContactRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Usuário não existe ' });
    }
    if (!cpf) {
      return response.status(400).json({ error: 'Inserir cpf' });
    }

    const contactByCpf = await ContactRepository.findByCpf(cpf);
    if (contactByCpf && contactByCpf.id !== id) {
      return response.status(400).json({ error: 'Cpf Já cadastrado' });
    }
    if (!rg) {
      return response.status(400).json({ error: 'Inserir RG' });
    }
    const contactByRg = await ContactRepository.findByRg(rg);
    if (contactByRg && contactByRg.id !== id) {
      return response.status(400).json({ error: 'RG Já Cadastrado' });
    }

    const contact = await ContactRepository.update(id, {
      name, cpf, rg, cep, rua, bairro, numero, complemento, cidade, estado,
    });
    response.json(contact);
  }

  // Deletar um registro
  async delete(request, response) {
    const { id } = request.params;

    await ContactRepository.delete(id);
    // 204: No content
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
