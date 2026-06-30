import Button from "@/pages/Admin/Components/Button";
import { usePagination } from "@/utils/Hooks/usePagination";
import Pagination from "@/pages/Admin/Components/Pagination";

const DosenTable = ({ dosen = [], loading, error, openEditModal, onDelete }) => {
  const pagination = usePagination(dosen, 5);
  if (loading) {
    return <p className="p-4 text-sm text-slate-500">Loading dosen...</p>;
  }

  if (error) {
    return <p className="p-4 text-sm text-red-600">Gagal memuat data dosen.</p>;
  }

  if (dosen.length === 0) {
    return <p className="p-4 text-sm text-slate-500">Tidak ada dosen.</p>;
  }

  return (
    <>
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">NIDN</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">Mata Kuliah</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {pagination.paginatedData.map((item, index) => (
          <tr
            key={item.id}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
          >
            <td className="py-2 px-4">{item.nidn}</td>
            <td className="py-2 px-4">{item.nama}</td>
            <td className="py-2 px-4">{item.mata_kuliah}</td>
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

export default DosenTable;
