import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { setCurrentPage, setItemsPerPage } from '../redux-toolkit/transactionSlice'
import Header from '../layout/Header'
import Menu from '../layout/Menu'
import { TransactionListPagination } from '../component/TransactionList'
import ModalExpense from '../component/modal/ModalTransaction'
import { toggleModal, resetTransactionData } from '../redux-toolkit/modalSlice'
function TransactionPage() {
  const dispatch = useDispatch()
  const modalStatus = useSelector((state) => state.modal)
  const { currentPage, itemsPerPage, transactions } = useSelector((state) => state.transactions)
  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
  }

  const handleItemsPerPageChange = (e) => {
    dispatch(setItemsPerPage(Number(e.target.value)))
  }
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTransactions = transactions.slice(startIndex, endIndex)

  const handleCloseModal = () => {
    dispatch(toggleModal(false))
    dispatch(resetTransactionData)
  }
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center '>
      <div className='w-full  h-[100vh] bg-white relative '>
        <Header />
        <div className='px-6 py-4 '>
          <div className='mb-4 flex items-center   justify-between'>
            <div>
              <p className='text-2xl font-bold'>List Transaction</p>
            </div>
            <select
              id='itemsPerPage'
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className='bg-gray-50 border border-gray-300 rounded-lg py-2 px-3'
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>

          <div className='overflow-y-auto h-[500px]'>
          <TransactionListPagination transactions={paginatedTransactions} />

          </div>

          <div className='mt-6 flex justify-center space-x-2'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={page === currentPage}
                className={`px-4 py-2 text-lg font-semibold rounded-lg transition-colors duration-200 ${
                  page === currentPage
                    ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                    : 'bg-white border border-gray-300 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Menu className='absolute bottom-0 left-0 w-full' />
      {modalStatus.isShow && (
        <ModalExpense
          isVisible={modalStatus.isShow}
          onClose={handleCloseModal}
          title={modalStatus.title}
          transactionData={modalStatus.transactionData}
        />
      )}
    </div>
  )
}
export default TransactionPage
