'use client';

import { revalidatePath, revalidateTag } from 'next/cache';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
type Product = {
  id: number,
  title: string,
  price: string
}

export default function EditProduct(data: Product) {
  const [titleProduct, setTitle] = useState(data.title);
  const [priceProduct, setPrice] = useState(data.price);
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch(`/products/api`, {
      cache: 'no-store',
      method: 'PATCH',
      body: JSON.stringify({
        id: data.id,
        title: titleProduct,
        price: priceProduct,
      }),
    });
    const result = await res.json();
    console.log(result);
    console.log(result.success == true);
    if (result.success == true) {
      document.getElementById('edit_product' + data.id)?.classList.remove('modal-open');
      router.refresh();
    }
  };

  return (
    <>
      <button
        className="btn btn-outline btn-info"
        onClick={() => {
          console.log(data.id)
          document.getElementById('edit_product' + data.id)?.classList.add('modal-open');
        }}
      >
        Edit Product
      </button>
      <dialog id={"edit_product" + data.id} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Edit Product</h3>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="title" placeholder="Type here..." value={titleProduct ?? ''} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full input-info" />
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input type="text" name="price" placeholder="Type here..." value={priceProduct ?? ''} onChange={(e) => setPrice(e.target.value)} className="input input-bordered w-full input-info" />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-info">
                Edit
              </button>
              <button type="reset" className="btn" onClick={() => document.getElementById('edit_product' + data.id)?.classList.remove('modal-open')}>
                Cancel
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          {/* if there is a button, it will close the modal */}
          <button className="">Close</button>
        </form>
      </dialog>
    </>
  );
}
