import Swal from "sweetalert2";

export const alertSuccess = async (message: string) => {
  return toast.fire({
    icon: "success",
    title: "Berhasil",
    text: message,
  });
};

export const alertError = async (message: string) => {
  return toast.fire({
    icon: "error",
    title: "Gagal",
    text: message,
  });
};

export const alertConfirm = async (message: string) => {
  const result = await Swal.fire({
    icon: "question",
    title: "Apakah Anda yakin?",
    text: message,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
  });
  return result.isConfirmed;
};

const toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});
