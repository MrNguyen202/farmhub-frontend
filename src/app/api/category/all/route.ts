import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import { RowDataPacket } from 'mysql2';

// Interface for type data
interface TypeSubcategory {
    id: number;
    name: string;
    slug: string;
}

// Interface for subcategory data
interface Subcategory {
    id: number;
    name: string;
    slug: string;
    types?: TypeSubcategory[];
}

// Interface for category data
interface Category {
    id: number;
    name: string;
    description: string | null;
    label: string;
    slug: string;
    image: string | null;
    icon: string;
    created_at: Date;
    numberOfProducts: number;
    subCategories?: Subcategory[];
}

const getAllCategories = async (): Promise<Category[]> => {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`
            SELECT 
                c.id AS category_id,
                c.name AS category_name,
                c.description AS category_description,
                c.label AS category_label,
                c.slug AS category_slug,
                c.image AS category_image,
                c.icon AS category_icon,
                c.created_at AS category_created_at,
                COUNT(DISTINCT ts.id) AS numberOfProducts,
                sc.id AS subcategory_id,
                sc.name AS subcategory_name,
                sc.slug AS subcategory_slug,
                ts.id AS type_id,
                ts.name AS type_name,
                ts.slug AS type_slug
            FROM category c
            LEFT JOIN subcategory sc ON c.id = sc.category_id
            LEFT JOIN TypeSubcategory ts ON sc.id = ts.subcategory_id
            GROUP BY 
                c.id, c.name, c.description, c.label, c.slug, c.image, c.icon, c.created_at,
                sc.id, sc.name, sc.slug,
                ts.id, ts.name, ts.slug
            ORDER BY c.id, sc.id, ts.id
        `) as [RowDataPacket[]];

        // Transform flat rows into nested structure
        const categoriesMap: { [key: number]: Category } = {};
        const subcategoriesMap: { [key: number]: Subcategory } = {};

        rows.forEach(row => {
            // Initialize category if not exists
            if (!categoriesMap[row.category_id]) {
                categoriesMap[row.category_id] = {
                    id: row.category_id,
                    name: row.category_name,
                    description: row.category_description,
                    label: row.category_label,
                    slug: row.category_slug,
                    image: row.category_image,
                    icon: row.category_icon,
                    created_at: row.category_created_at,
                    numberOfProducts: row.numberOfProducts,
                    subCategories: []
                };
            }

            // Initialize subcategory if not exists and if subcategory_id is present
            if (row.subcategory_id && !subcategoriesMap[row.subcategory_id]) {
                subcategoriesMap[row.subcategory_id] = {
                    id: row.subcategory_id,
                    name: row.subcategory_name,
                    slug: row.subcategory_slug,
                    types: []
                };
                categoriesMap[row.category_id].subCategories!.push(subcategoriesMap[row.subcategory_id]);
            }

            // Add type to subcategory if type_id is present
            if (row.type_id && subcategoriesMap[row.subcategory_id]) {
                subcategoriesMap[row.subcategory_id].types!.push({
                    id: row.type_id,
                    name: row.type_name,
                    slug: row.type_slug
                });
            }
        });

        return Object.values(categoriesMap);
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Database error');
    }
};

export async function GET() {
    try {
        // Fetch all categories with subcategories and types
        const categories = await getAllCategories();

        // Map categories to match the categories.ts format
        const categoriesData = categories.map(category => ({
            id: category.id,
            name: category.name,
            label: category.label,
            slug: category.slug,
            image: category.image,
            icon: category.icon,
            numberOfProducts: Number(category.numberOfProducts),
            subCategories: category.subCategories?.map(sub => ({
                id: sub.id,
                name: sub.name,
                slug: sub.slug,
                types: sub.types?.map(type => ({
                    name: type.name,
                    slug: type.slug
                })) || []
            })) || []
        }));

        return NextResponse.json({
            categories: categoriesData
        });

    } catch (error) {
        console.error('Get categories error:', error);
        return NextResponse.json(
            { error: 'Đã có lỗi xảy ra, vui lòng thử lại sau' },
            { status: 500 }
        );
    }
}

// Handle other HTTP methods
export async function POST() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    );
}

export async function PUT() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    );
}

export async function DELETE() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    );
}