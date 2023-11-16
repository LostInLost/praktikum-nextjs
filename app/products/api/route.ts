"use server"
import { revalidateTag } from 'next/cache';
import {v4 as uuidv4} from 'uuid'
export async function GET() {
    const res = await fetch('http://localhost:2023/products', {
        next: {
            tags: ['products']
        }
    });

    const products = await res.json()

    return Response.json({products});
}

export async function POST(req: Request){
    const data = await req.json()
    const create = await fetch('http://localhost:2023/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: uuidv4(),
            title: data.title,
            price: Number(data.price)
        })
    });
    // const res = await create.json()
    if (create.status == 500) return Response.json({
        success: false
    }, {
        status: 500
    })

    revalidateTag('products')
    return Response.json({
        success: true
    })
}

export async function PATCH(req: Request) {
    const { id, title, price } = await req.json();
    const updateProduct = await fetch(`http://localhost:2023/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        price: price,
      }),
    });

    if (updateProduct.status == 500)
      return Response.json(
        {
          success: false,
        },
        {
          status: 500,
        }
      );

    revalidateTag('products');
    return Response.json({
      success: true,
    });
}

export async function DELETE(req: Request) {
    const {id} = await req.json()
    const deleteProduct = await fetch(`http://localhost:2023/products/${id}`, {
        method: 'DELETE'
    })

    if (deleteProduct.status == 500)
      return Response.json(
        {
          success: false,
        },
        {
          status: 500,
        }
      );

    revalidateTag('products');
    return Response.json({
      success: true,
    });
}


