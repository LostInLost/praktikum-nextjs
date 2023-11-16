
import { Metadata } from 'next';
import AddProduct from './_components/AddProduct';
import DeleteProduct from './_components/DeleteProduct';
import EditProduct from './_components/EditProduct';

export const metadata: Metadata = {
  title: 'Product List'
}

type Products = {
  id: number;
  title: string;
  price: number;
};


async function getProducts() {
  const res = await fetch(`${process.env.URL}/products/api`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const products = await res.json();
  return products.products;
}
export default async function ProductList() {
  const data: any[] = await getProducts();
  return (
    <>
    <div className="container mx-auto p-3">
      <div>
        <AddProduct />
      </div>
      <div>
        <table className="table">
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, i) => (
              <tr className="text-center" key={data.id}>
                <td>{i + 1}</td>
                <td>{data.title}</td>
                <td>{data.price}</td>
                <td className="">
                  <div className="flex gap-5 justify-center">
                    <EditProduct {...data}/>
                    <DeleteProduct id={data.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  );
}
