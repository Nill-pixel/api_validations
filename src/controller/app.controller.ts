/* eslint-disable prettier/prettier */

import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ValidationService } from "src/services/validation.service";

@Controller('validate')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) { }

  /**
   * POST /validate/type
   * Valida o tipo e converte o valor para o tipo desejado.
   */
  @Post('type')
  validateType(@Body() body: any) {
    const { value, targetType } = body;
    try {
      const convertedValue = this.validationService.convertAndValidateType(value, targetType);
      return { success: true, convertedValue };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * POST /validate/format
   * Valida o formato do valor (e.g., email ou URL).
   */
  @Post('format')
  validateFormat(@Body() body: any) {
    const { value, format } = body;
    try {
      this.validationService.validateFormat(value, format);
      return { success: true, message: 'Formato válido' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * POST /validate/nested
   * Valida objetos aninhados.
   */
  @Post('nested')
  validateNested(@Body() body: any) {
    const { object, schema } = body;
    try {
      this.validationService.validateNestedObject(object, schema);
      return { success: true, message: 'Objeto aninhado válido' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * POST /validate/rules
   * Valida um objeto aninhado com regras específicas.
   */
  @Post('rules')
  applyRulesForNested(@Body() body: any) {
    const { object, rules } = body;
    try {
      this.validationService.applyRulesForNestedData(object, rules);
      return { success: true, message: 'Regras aplicadas com sucesso' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * POST /validate/schema
   * Valida com base em um esquema dinâmico.
   */
  @Post('schema')
  validateWithSchema(@Body() body: any) {
    const { object, schema } = body;
    try {
      this.validationService.validateWithDynamicSchema(object, schema);
      return { success: true, message: 'Validação de esquema bem-sucedida' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * POST /validate/crud
   * Valida a integridade dos dados em operações CRUD.
   */
  @Post('crud')
  validateCrud(@Body() body: any) {
    const { data, operation, schema } = body;
    try {
      this.validationService.validateOnCrudOperation(data, operation, schema);
      return { success: true, message: 'Validação de operação CRUD bem-sucedida' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
