import Button from "@/pages/Admin/Components/Button";
import { usePagination } from "@/utils/Hooks/usePagination";
import Pagination from "@/pages/Admin/Components/Pagination";

const MataKuliahTable = ({ mataKuliah = [], loading, error, openEditModal, onDelete }) => {
  const pagination = usePagination(mataKuliah, 5);
  if (loading) {
    return <p className="p-4 text-sm text-slate-500">Loading mata kuliah...</p>;
  }

  if (error) {
    return <p className="p-4 text-sm text-red-600">Gagal memuat data mata kuliah.</p>;
  }

  if (mataKuliah.length === 0) {
    return <p className="p-4 text-sm text-slate-500">Tidak ada mata kuliah.</p>;
  }

  return (
    <>
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Kode</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">SKS</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {pagination.paginatedData.map((item, index) => (
          <tr
            key={item.id}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
          >
            <td className="py-2 px-4">{item.kode}</td>
            <td className="py-2 px-4">{item.nama}</td>
            <td className="py-2 px-4">{item.sks}</td>
            <td className="py-2 px-4 text-center space-x-2">
              <Button size="sm" variant="warning" onClick={() => openEditModal(item)}>
                Edit
              </Button>
              <Button size="sm" variant="danger" onClick={() => onDelete(item.id)}>
                Hapus
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Pagination {...pagination} />
  </>
  );
};

export default MataKuliahTable;
