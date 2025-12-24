import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query;

      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`);

      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(5, "Name must have at least 5 characters"),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products").insert({ name, price });

      return response
        .status(201)
        .json({ message: "Product created successfully" });
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "Id must be a number" })
        .parse(request.params.id);

      const product = await knex<ProductRepository>("products")
        .where({ id })
        .select()
        .first();

      if (!product) {
        throw new AppError("Product not found", 400);
      }

      const bodySchema = z.object({
        name: z.string().trim().min(5, "Name must have at least 5 characters"),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products")
        .where({ id })
        .update({ name, price, updated_at: knex.fn.now() });

      return response.json({ message: "Product update successfully" });
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "Id must be a number" })
        .parse(request.params.id);

      const product = await knex<ProductRepository>("products")
        .where({ id })
        .select()
        .first();

      if (!product) {
        throw new AppError("Product not found", 400);
      }

      await knex<ProductRepository>("products").where({ id }).delete();

      return response.json({ message: "Product removed successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
