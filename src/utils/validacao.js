// Funções de validação para dados do estacionamento

/**
 * Valida os dados do formulário de cadastro de vaga
 * @param {Object} dadosVaga - Dados da vaga a serem validados
 * @returns {Object} - Objeto contendo erro e mensagem (se houver erro)
 */
export const validarDadosCadastro = (dadosVaga) => {
    // Verificação da placa (formato AAA-0000 ou AAA0A00)
    const regexPlaca = /^[A-Z]{3}[-]?[0-9]{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
    if (!regexPlaca.test(dadosVaga.placa.toUpperCase())) {
      return {
        erro: true,
        mensagem: 'Formato de placa inválido. Use AAA-0000 ou padrão Mercosul.',
        tipo: 'error'
      };
    }
      
    // Verificação do número do apartamento
    if (isNaN(dadosVaga.apartamento) || dadosVaga.apartamento <= 0) {
      return {
        erro: true,
        mensagem: 'Número de apartamento inválido.',
        tipo: 'error'
      };
    }
      
    // Verificação do bloco
    if (!dadosVaga.bloco.trim()) {
      return {
        erro: true,
        mensagem: 'Bloco do apartamento é obrigatório.',
        tipo: 'error'
      };
    }
      
    // Verificação do modelo do veículo
    if (!dadosVaga.modelo.trim()) {
      return {
        erro: true,
        mensagem: 'Modelo do veículo é obrigatório.',
        tipo: 'error'
      };
    }
      
    // Verificação da cor do veículo
    if (!dadosVaga.cor.trim()) {
      return {
        erro: true,
        mensagem: 'Cor do veículo é obrigatória.',
        tipo: 'error'
      };
    }
      
    // Verificação da vaga
    if (!dadosVaga.vaga) {
      return {
        erro: true,
        mensagem: 'Selecione uma vaga disponível.',
        tipo: 'error'
      };
    }
      
    // Se chegar aqui, não há erro
    return { erro: false };
  };
  
  /**
   * Formatador de texto para uso nos relatórios
   * @param {string} texto - Texto a ser formatado
   * @param {string} formato - Formato desejado (maiúsculo, minúsculo, capitalizado)
   * @returns {string} - Texto formatado
   */
  export const formatarTexto = (texto, formato) => {
    switch (formato) {
      case 'maiusculo':
        return texto.toUpperCase();
      case 'minusculo':
        return texto.toLowerCase();
      case 'capitalizado':
        return texto.split(' ')
          .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
          .join(' ');
      default:
        return texto;
    }
  };