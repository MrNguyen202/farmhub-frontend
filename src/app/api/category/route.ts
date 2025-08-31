import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import { RowDataPacket } from 'mysql2';

// Interface for category data
interface Category extends RowDataPacket {
    id: number;
    name: string;
    description: string | null;
    label: string;
    slug: string;
    image: string | null;
    icon: string;
    created_at: Date;
    numberOfProducts: number;
}

// Get all categories with number of products (types)
const getAllCategories = async (): Promise<Category[]> => {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`
            SELECT 
                c.id,
                c.name,
                c.description,
                c.label,
                c.slug,
                c.image,
                c.icon,
                c.created_at,
                COUNT(ts.id) AS numberOfProducts
            FROM category c
            LEFT JOIN subcategory sc ON c.id = sc.category_id
            LEFT JOIN TypeSubcategory ts ON sc.id = ts.subcategory_id
            GROUP BY c.id, c.name, c.description, c.label, c.slug, c.image, c.icon, c.created_at
        `) as [Category[]];
        return rows;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Database error');
    }
};

export async function GET() {
    try {
        // Fetch all categories
        const categories = await getAllCategories();

        // Map categories to match the expected response format
        const categoriesData = categories.map(category => ({
            id: category.id,
            name: category.name,
            description: category.description,
            label: category.label,
            slug: category.slug,
            images: category.image ? [category.image] : [], // Convert single image to array
            icon: category.icon,
            createdAt: category.created_at,
            numberOfProducts: Number(category.numberOfProducts)
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