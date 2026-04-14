import Swal from 'sweetalert2'

export const nexusAlert = Swal.mixin({
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel',
  customClass: {
    popup: 'nexus-alert-popup',
    title: 'nexus-alert-title',
    confirmButton: 'nexus-alert-confirm',
    cancelButton: 'nexus-alert-cancel',
  },
  buttonsStyling: false
})

export const nexusToast = Swal.mixin({
  toast: true,
  position: 'bottom-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: 'nexus-toast-popup',
  }
})
