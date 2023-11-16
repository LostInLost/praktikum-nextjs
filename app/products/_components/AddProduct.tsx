'use client';

import { revalidatePath, revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter()
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch(`/products/api`, {
      method: 'POST',
      body: JSON.stringify({
        title: formData.get('title'),
        price: formData.get('price'),
      }),
    });
    const result = await res.json();
    console.log(result.success == true)
    if (result.success == true) {
      document.getElementById('add_product')?.classList.remove('modal-open')
      router.refresh()
    }
  };
  return (
    <>
      <button className="btn btn-primary" onClick={() => document.getElementById('add_product')?.classList.add('modal-open')}>
        Add Product
      </button>
      <dialog id="add_product" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Add Product</h3>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="title" placeholder="Type here..." className="input input-bordered w-full input-primary" />
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input type="text" name="price" placeholder="Type here..." className="input input-bordered w-full input-primary" />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
              <button type="reset" className="btn" onClick={() => document.getElementById('add_product')?.classList.remove('modal-open')}>
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
