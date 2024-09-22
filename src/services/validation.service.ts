/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  convertAndValidateType(value: any, targetType: string): any {
    switch (targetType) {
      case 'integer':
        return this.convertToInteger(value)
      case 'float':
        return this.convertToFloat(value)
      case 'date':
        return this.convertToDate(value)
      default:
        throw new BadRequestException(`Cannot conver to ${targetType}`)
    }
  }

  private convertToInteger(value: any): number {
    const parsed = parseInt(value, 10)
    if (isNaN(parsed)) {
      throw new BadRequestException(`Value must be an integer.`)
    }
    return parsed
  }

  private convertToFloat(value: any): number {
    const parsed = parseFloat(value)
    if (isNaN(parsed)) {
      throw new BadRequestException(`Value must be a float.`)
    }
    return parsed
  }

  convertToDate(value: any): Date {
    const parsed = Date.parse(value)
    if (isNaN(parsed)) {
      throw new BadRequestException(`Value mus be a date.`)
    }
    return new Date(parsed)
  }
  /**
    * 2. Verifique se os dados são do tipo certo.
    */
  validateType(value: any, expectedType: string): void {
    switch (expectedType) {
      case 'integer':
        if (!Number.isInteger(value)) {
          throw new BadRequestException(`Value must be an integer.`);
        }
        break;
      case 'float':
        if (typeof value !== 'number' || isNaN(value)) {
          throw new BadRequestException(`Value must be a float.`);
        }
        break;
      case 'boolean':
        if (typeof value !== 'boolean') {
          throw new BadRequestException(`Value must be a boolean.`);
        }
        break;
      case 'date':
        if (!(value instanceof Date)) {
          throw new BadRequestException(`Value must be a valid date.`);
        }
        break;
      case 'string':
        if (typeof value !== 'string') {
          throw new BadRequestException(`Value must be a string.`);
        }
        break;
      case 'array':
        if (!Array.isArray(value)) {
          throw new BadRequestException(`Value must be an array.`);
        }
        break;
      case 'object':
        if (typeof value !== 'object' || Array.isArray(value)) {
          throw new BadRequestException(`Value must be an object.`);
        }
        break;
      default:
        throw new BadRequestException(`Unknown data type: ${expectedType}`);
    }
  }

  /**
   * 3. Valide formatos e estruturas como e-mails e URLs.
   */
  validateFormat(value: string, format: string): void {
    if (format === 'email' && !this.isEmail(value)) {
      throw new BadRequestException(`Value must be a valid email.`);
    }
    if (format === 'url' && !this.isURL(value)) {
      throw new BadRequestException(`Value must be a valid URL.`);
    }
  }

  private isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  private isURL(value: string): boolean {
    const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    return urlRegex.test(value);
  }

  /**
   * 4. Valide objetos aninhados e arrays de objetos.
   */
  validateNestedObject(object: any, schema: any): void {
    if (typeof object !== 'object' || Array.isArray(object)) {
      throw new BadRequestException('Value must be an object.');
    }

    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const expectedType = schema[key].type;
        this.validateType(object[key], expectedType);
      }
    }
  }

  validateArrayOfObjects(array: any[], schema: any): void {
    if (!Array.isArray(array)) {
      throw new BadRequestException('Value must be an array.');
    }

    array.forEach(item => {
      this.validateNestedObject(item, schema);
    });
  }

  /**
   * 5. Aplique regras específicas para dados aninhados.
   */
  applyRulesForNestedData(object: any, rules: any): void {
    for (const key in rules) {
      if (rules.hasOwnProperty(key)) {
        const rule = rules[key];
        // Exemplo: Se houver uma regra para validar que um campo aninhado é obrigatório
        if (rule.required && !object[key]) {
          throw new BadRequestException(`${key} is required.`);
        }
        // Outras regras específicas podem ser aplicadas aqui
      }
    }
  }

  /**
   * 6. Use esquemas de validação que podem ser atualizados em tempo real ou configurados dinamicamente.
   */
  validateWithDynamicSchema(object: any, schema: any): void {
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const fieldSchema = schema[key];
        this.validateType(object[key], fieldSchema.type);
        if (fieldSchema.format) {
          this.validateFormat(object[key], fieldSchema.format);
        }
      }
    }
  }

  /**
   * 7. Valide dados durante a execução da API, não só na entrada.
   */
  validateOnUpdate(newData: any, originalData: any, schema: any): void {
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const fieldSchema = schema[key];
        this.validateType(newData[key], fieldSchema.type);
        if (fieldSchema.format) {
          this.validateFormat(newData[key], fieldSchema.format);
        }
      }
    }
  }

  /**
   * 8. Verifique a integridade dos dados durante operações CRUD.
   */
  validateOnCrudOperation(data: any, operation: 'create' | 'update', schema: any): void {
    if (operation === 'create') {
      this.validateWithDynamicSchema(data, schema);
    } else if (operation === 'update') {
      this.validateOnUpdate(data, data, schema);
    }
  }

  /**
   * 9. Forneça mensagens de erro claras quando a validação falhar.
   */
  generateErrorMessage(field: string, message: string): void {
    throw new BadRequestException(`Validation failed for field "${field}": ${message}`);
  }
}
