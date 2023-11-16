'use client'

import { useRouter } from "next/navigation"

export default function DeleteProduct({id}: {id: string}) {
    const router = useRouter()
    const deleteProduct = async() => {
        const res = await fetch(`/products/api`, {
            method: 'DELETE',
            body: JSON.stringify({
                id: id
            })
        })

        if (res.status == 200) {
            router.refresh()
        }
    }
    return (
      <>
        <button className="btn btn-danger" onClick={() => deleteProduct()}>
          Delete
        </button>
      </>
    );
}