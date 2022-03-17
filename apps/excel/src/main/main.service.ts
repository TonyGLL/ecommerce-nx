import { User } from '../models/users.model';
import { Product } from '../models/products.model';
import { Category } from '../models/categories.model';
import * as excel from 'exceljs';
import { Response } from 'express';
import moment from 'moment';

class excelServices {
  constructor() { }
  public async downloadUsers(res: Response): Promise<any> {
    try {
      const users = await User.findAll();
      const workbook = new excel.Workbook();
      const worksheet: any = workbook.addWorksheet('Users');

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Correo electronico', key: 'email', width: 20 },
        { header: 'Nombre', key: 'name', width: 20 },
        { header: 'Apellidos', key: 'last_name', width: 15, style: { numFmt: 'mm-dd-yyyy' } },
        { header: 'Numero de Telefono', key: 'phone', width: 20 },
        { header: 'Rol', key: 'role', width: 20 },
        { header: 'Avatar', key: 'avatar', width: 50 },
        { header: 'Estatus', key: 'status', width: 20 },
        { header: 'Miembro desde', key: 'createdAt', width: 15 }
      ];

      worksheet.addRows(users);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + `users-${moment().locale('es').format('DD-MM-YYYY')}.xlsx`
      );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    } catch (error) {
      return [500, error];
    }
  }

  public async downloadProducts(res: Response): Promise<any> {
    try {
      const products = await Product.findAll();
      const workbook = new excel.Workbook();
      const worksheet: any = workbook.addWorksheet('Products');

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'name', width: 20 },
        { header: 'Descripción', key: 'description', width: 30, style: { numFmt: 'mm-dd-yyyy' } },
        { header: 'Precio', key: 'price', width: 15 },
        { header: 'Estatus', key: 'status', width: 20 },
        { header: 'Imagen', key: 'image', width: 50 },
        { header: 'Creado desde', key: 'createdAt', width: 15 }
      ];

      worksheet.addRows(products);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + `products-${moment().locale('es').format('DD-MM-YYYY')}.xlsx`
      );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    } catch (error) {
      return [500, error];
    }
  }

  public async downloadCategories(res: Response): Promise<any> {
    try {
      const categories = await Category.findAll();
      const workbook = new excel.Workbook();
      const worksheet: any = workbook.addWorksheet('Categories');

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'name', width: 20 },
        { header: 'Imagen', key: 'image', width: 50 },
        { header: 'Estatus', key: 'status', width: 20 },
        { header: 'Creada desde', key: 'createdAt', width: 15 }
      ];

      worksheet.addRows(categories);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + `categories-${moment().locale('es').format('DD-MM-YYYY')}.xlsx`
      );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    } catch (error) {
      return [500, error];
    }
  }
}

export default new excelServices();
