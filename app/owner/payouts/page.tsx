'use client'

import { useState, useEffect } from 'react'
import {
  TrendingUp,
  Wallet,
  Search,
  Download,
  IndianRupee,
  ArrowUpRight,
  History,
  ChevronRight,
  ShieldCheck,
  Building2,
  Clock,
  ArrowDownCircle,
  AlertCircle,
  CreditCard,
  Plus,
  Info,
} from 'lucide-react'
import { ownerApi } from '@/lib/api'
import { Skeleton } from '@/components/skeletons'
import { useAuth } from '@/lib/auth-context'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import {
  exportToCSV,
  formatCurrency,
  formatDateTimeForExport,
} from '@/lib/export-utils'
import { toast } from 'sonner'

export default function OwnerPayoutsPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [summary, setSummary] = useState({
    totalGross: 0,
    totalServiceCharge: 0,
    totalNet: 0,
  })
  const [bankDetails, setBankDetails] = useState<any>(null)
  const [isBankModalOpen, setIsBankModalOpen] = useState(false)

  // Bank details form state
  const [bankForm, setBankForm] = useState({
    accountHolderName: '',
    accountNumber: '',
    ifsc: '',
    bankName: '',
    upiId: '',
  })
  const [savingBank, setSavingBank] = useState(false)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [payoutsData, bankData] = await Promise.all([
        ownerApi.getPayouts(),
        ownerApi.getBankDetails(),
      ])

      // Server now filters to only show transactions where payment has been captured
      setTransactions(payoutsData.transactions)
      setSummary(payoutsData.summary)
      setBankDetails(bankData.bankDetails)

      if (bankData.bankDetails) {
        setBankForm({
          accountHolderName: bankData.bankDetails.accountHolderName || '',
          accountNumber: bankData.bankDetails.accountNumber || '',
          ifsc: bankData.bankDetails.ifsc || '',
          bankName: bankData.bankDetails.bankName || '',
          upiId: bankData.bankDetails.upiId || '',
        })
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch payout data')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateBank = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSavingBank(true)
      await ownerApi.updateBankDetails(bankForm)
      await fetchData()
      setIsBankModalOpen(false)
    } catch (err: any) {
      alert(err.message || 'Failed to update bank details')
    } finally {
      setSavingBank(false)
    }
  }

  const handleExportCSV = async () => {
    try {
      setExporting(true)

      if (transactions.length === 0) {
        toast.error('No transactions to export')
        return
      }

      // Prepare data for export
      const exportData = transactions.map((transaction) => ({
        date: formatDateTimeForExport(transaction.createdAt),
        propertyName: transaction.listing?.title || 'Unknown Property',
        transactionId: transaction._id,
        totalAmount: formatCurrency(
          transaction.grossRent + (transaction.depositAmount || 0),
        ),
        serviceFee: formatCurrency(transaction.serviceChargeAmount),
        yourShare: formatCurrency(transaction.ownerNetPayout),
        status: transaction.payoutStatus,
        paymentMethod: transaction.paymentMethod || 'N/A',
      }))

      // Define CSV headers
      const headers = {
        date: 'Date & Time',
        propertyName: 'Property Name',
        transactionId: 'Transaction ID',
        totalAmount: 'Total Amount',
        serviceFee: 'Service Fee',
        yourShare: 'Your Share',
        status: 'Status',
        paymentMethod: 'Payment Method',
      }

      // Generate filename with current date
      const filename = `payouts_${format(new Date(), 'yyyy-MM-dd')}.csv`

      // Export CSV
      await exportToCSV(exportData, filename, headers)

      toast.success('Transactions exported successfully!')
    } catch (err: any) {
      console.error('Export error:', err)
      toast.error(err.message || 'Failed to export transactions')
    } finally {
      setExporting(false)
    }
  }

  if (loading) {
    return (
      <div className='px-6 md:px-12 pb-20 animate-pulse'>
        <header className='py-10 border-b border-outline-variant/5 mb-12'>
          <Skeleton className='h-8 w-48 mb-2' />
          <Skeleton className='h-4 w-96' />
        </header>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12'>
          <Skeleton className='h-64 xl:col-span-2 rounded-[2.5rem]' />
          <Skeleton className='h-64 rounded-[2.5rem]' />
        </div>
        <Skeleton className='h-96 rounded-[2.5rem]' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] px-6'>
        <AlertCircle className='w-16 h-16 text-primary/40 mb-4' />
        <h2 className='text-xl font-bold mb-2'>Something went wrong</h2>
        <p className='text-on-surface-variant mb-6 text-center'>{error}</p>
        <button
          onClick={fetchData}
          className='px-6 py-2 bg-primary text-white rounded font-bold'
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className='px-4 md:px-12 pb-20'>
      <header className='py-6 md:py-10 border-b border-outline-variant/5 mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6'>
        <div>
          <h2 className='text-lg md:text-xl font-headline font-black text-on-surface mb-2 tracking-wide'>
            Payouts Dashboard
          </h2>
          <p className='text-on-surface-variant font-body text-sm md:text-base leading-relaxed font-medium max-w-2xl'>
            View your earnings, platform fees, and payout history for all your
            properties in one place.
          </p>
        </div>
        <button
          onClick={() => setIsBankModalOpen(true)}
          className='w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-white border border-outline-variant/20 rounded shadow-sm hover:shadow-md transition-all group'
        >
          <CreditCard className='w-5 h-5 text-primary' />
          <span className='text-[10px] md:text-xs font-black tracking-widest'>
            {bankDetails ? 'Update Payout Account' : 'Setup Payout Account'}
          </span>
        </button>
      </header>

      {/* Bento Grid Earnings Summary */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12'>
        {/* Lifetime Earnings */}
        <div className='xl:col-span-2 bg-on-surface p-6 md:p-10 rounded flex flex-col justify-between shadow-2xl shadow-on-surface/20 relative overflow-hidden group min-h-[280px] md:min-h-0'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2'></div>
          <div className='relative z-10'>
            <p className='text-[9px] md:text-[10px] font-black tracking-[0.2em] text-white/40 mb-3 md:mb-4'>
              Total Earnings
            </p>
            <h2 className='text-4xl md:text-7xl font-black font-headline text-white tracking-tighter mb-6 md:mb-8 leading-none'>
              ₹{summary.totalNet.toLocaleString('en-IN')}
            </h2>
            <div className='flex gap-3 md:gap-4 flex-wrap'>
              <div className='px-3 md:px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-[9px] md:text-[10px] font-black rounded border border-emerald-500/20 flex items-center gap-2 tracking-widest shadow-lg shadow-emerald-500/5'>
                <ArrowUpRight className='w-3.5 h-3.5 md:w-4 md:h-4' />
                Live
              </div>
              <div className='px-3 md:px-4 py-1.5 bg-white/5 text-white/60 text-[9px] md:text-[10px] font-black rounded border border-white/5 flex items-center gap-2 tracking-widest'>
                <History className='w-3 md:w-3.5 h-3 md:h-3.5' />
                LIFETIME
              </div>
            </div>
          </div>
          <div className='absolute right-6 bottom-6 md:right-10 md:bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700'>
            <Wallet className='w-24 h-24 md:w-40 md:h-40 text-white' />
          </div>
        </div>

        {/* Current Month */}
        <div className='bg-white p-6 md:p-10 rounded flex flex-col shadow-sm border border-outline-variant/10 group hover:border-primary/20 transition-all duration-500'>
          <div className='flex items-center justify-between mb-6 md:mb-8'>
            <p className='text-[9px] md:text-[10px] font-black tracking-widest text-on-surface-variant opacity-60'>
              Recent Payouts
            </p>
            <div className='w-8 h-8 md:w-10 md:h-10 bg-primary/5 rounded flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all'>
              <IndianRupee className='w-4 h-4 md:w-5 md:h-5' />
            </div>
          </div>
          <h3 className='text-3xl md:text-4xl font-black font-headline text-on-surface tracking-tighter mb-8 md:mb-10 leading-none'>
            ₹{summary.totalNet.toLocaleString('en-IN')}
          </h3>
          <div className='flex-1 space-y-4 md:space-y-6'>
            <div className='flex justify-between items-center group/item'>
              <span className='text-[10px] md:text-xs font-bold text-on-surface-variant/60 tracking-widest'>
                Total Revenue
              </span>
              <span className='text-xs md:text-sm font-black text-on-surface'>
                ₹{summary.totalGross.toLocaleString('en-IN')}
              </span>
            </div>
            <div className='flex justify-between items-center group/item'>
              <div className='flex items-center gap-2'>
                <span className='text-[10px] md:text-xs font-bold text-on-surface-variant/60 tracking-widest text-primary'>
                  Service Fee
                </span>
                <ShieldCheck className='w-3.5 h-3.5 text-primary/40' />
              </div>
              <span className='text-xs md:text-sm font-black text-primary'>
                -₹{summary.totalServiceCharge.toLocaleString('en-IN')}
              </span>
            </div>
            <div className='pt-4 md:pt-6 border-t border-outline-variant/10 flex justify-between items-center'>
              <span className='text-[10px] md:text-xs font-black tracking-[0.2em] text-on-surface opacity-80'>
                Net Payout
              </span>
              <div className='flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded border border-emerald-100'>
                <span className='text-[10px] md:text-[11px] font-black tracking-tight'>
                  ₹{summary.totalNet.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Account Banner if missing */}
      {!bankDetails && (
        <div className='mb-8 md:mb-12 p-6 md:p-8 bg-primary/5 rounded border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6'>
          <div className='flex items-center gap-6'>
            <div className='w-16 h-16 bg-primary/10 rounded flex items-center justify-center text-primary'>
              <CreditCard className='w-8 h-8' />
            </div>
            <div>
              <h4 className='text-lg font-black text-on-surface mb-1'>
                Set up your payout account
              </h4>
              <p className='text-sm text-on-surface-variant font-medium'>
                Add your bank details to receive payments for your listings.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBankModalOpen(true)}
            className='w-full md:w-auto px-8 py-4 bg-primary text-white rounded font-black text-xs tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95'
          >
            Add Bank Details
          </button>
        </div>
      )}

      {/* Payout Process Info Banner */}
      <div className='mb-8 md:mb-12 p-6 md:p-8 bg-blue-50 rounded border border-blue-100 flex items-start gap-4'>
        <div className='w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0'>
          <Info className='w-5 h-5 md:w-6 md:h-6' />
        </div>
        <div>
          <h4 className='text-sm md:text-base font-bold text-blue-900 mb-1'>
            Manual Payout Process
          </h4>
          <p className='text-xs md:text-sm text-blue-800 leading-relaxed'>
            Payouts are processed manually by our admin team via UPI or bank transfer. Once a student's payment is confirmed, the admin will initiate your payout and update the status accordingly. You can track all payout statuses below.
          </p>
        </div>
      </div>

      {/* Transaction Controls */}
      <div className='flex flex-col xl:flex-row justify-between items-center mb-8 md:mb-10 gap-4 md:gap-6'>
        <div className='relative w-full xl:w-96 group'>
          <Search className='absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors w-5 h-5' />
          <input
            className='w-full h-12 md:h-14 pl-14 pr-6 bg-white rounded border border-outline-variant/10 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none text-sm font-bold transition-all shadow-sm placeholder:text-on-surface-variant/30'
            placeholder='Search transactions...'
            type='text'
          />
        </div>
        <div className='flex gap-3 md:gap-4 w-full xl:w-auto'>
          <button
            onClick={handleExportCSV}
            disabled={exporting || transactions.length === 0}
            className='flex-1 xl:flex-none h-12 md:h-14 px-6 md:px-8 bg-on-surface text-surface rounded text-[10px] font-black tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-on-surface/10 active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100'
          >
            {exporting ? (
              <>
                <div className='w-3.5 h-3.5 md:w-4 md:h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin' />
                Exporting...
              </>
            ) : (
              <>
                <Download className='w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-y-0.5 transition-transform' />
                Export
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Transaction List - Card Based */}
      <div className='md:hidden space-y-4'>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction._id}
              className='bg-white rounded p-5 border border-outline-variant/10 shadow-sm'
            >
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <p className='text-xs font-black text-on-surface-variant opacity-40 tracking-widest mb-1'>
                    {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
                  </p>
                  <h4 className='text-sm font-bold text-on-surface line-clamp-1'>
                    {transaction.listing?.title || 'Unknown Property'}
                  </h4>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 text-[9px] font-black tracking-widest rounded ${
                    transaction.payoutStatus === 'settled'
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : transaction.payoutStatus === 'processing'
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'bg-orange-50 text-orange-600 border border-orange-100'
                  }`}
                >
                  {transaction.payoutStatus}
                </span>
              </div>

              <div className='grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/5'>
                <div>
                  <p className='text-[10px] font-bold text-on-surface-variant opacity-40 tracking-widest mb-1'>
                    Total Amount
                  </p>
                  <p className='text-sm font-black text-on-surface'>
                    ₹
                    {(
                      transaction.grossRent + (transaction.depositAmount || 0)
                    ).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-[10px] font-bold text-on-surface-variant opacity-40 tracking-widest mb-1'>
                    Service Fee
                  </p>
                  <p className='text-sm font-black text-primary'>
                    -₹{transaction.serviceChargeAmount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className='mt-4 pt-4 border-t border-outline-variant/5 flex justify-between items-center'>
                <p className='text-[10px] font-black text-on-surface tracking-widest'>
                  Your Share
                </p>
                <p className='text-lg font-black font-headline text-on-surface tracking-tighter'>
                  ₹{transaction.ownerNetPayout.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className='py-12 bg-white rounded border border-outline-variant/10 text-center px-6'>
            <History className='w-8 h-8 text-on-surface-variant opacity-20 mx-auto mb-3' />
            <h3 className='text-sm font-black text-on-surface mb-1'>
              No transactions
            </h3>
            <p className='text-xs text-on-surface-variant font-medium'>
              Wait for confirmed bookings.
            </p>
          </div>
        )}
      </div>

      {/* Desktop Transaction List - Table */}
      <div className='hidden md:block bg-white rounded shadow-sm overflow-hidden border border-outline-variant/10'>
        <div className='overflow-x-auto'>
          {transactions.length > 0 ? (
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-surface-container-lowest/50 border-b border-outline-variant/10'>
                  <th className='px-10 py-6 text-[10px] font-black tracking-widest text-on-surface-variant opacity-40'>
                    Date & Time
                  </th>
                  <th className='px-10 py-6 text-[10px] font-black tracking-widest text-on-surface-variant opacity-40'>
                    Property Details
                  </th>
                  <th className='px-10 py-6 text-[10px] font-black tracking-widest text-on-surface-variant opacity-40'>
                    Total Amount
                  </th>
                  <th className='px-10 py-6 text-[10px] font-black tracking-widest text-on-surface-variant opacity-40'>
                    Service Fee
                  </th>
                  <th className='px-10 py-6 text-[10px] font-black tracking-widest text-on-surface-variant opacity-40'>
                    Your Share
                  </th>
                  <th className='px-10 py-6 text-[10px] font-black tracking-widest text-on-surface-variant opacity-40 text-right'>
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-outline-variant/5'>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className='hover:bg-surface-container-lowest transition-all group'
                  >
                    <td className='px-10 py-8'>
                      <div className='flex items-center gap-3'>
                        <Clock className='w-4 h-4 text-on-surface-variant opacity-20' />
                        <div>
                          <p className='text-sm font-bold text-on-surface'>
                            {format(
                              new Date(transaction.createdAt),
                              'MMM dd, yyyy',
                            )}
                          </p>
                          <p className='text-[10px] font-black text-on-surface-variant opacity-40 tracking-tighter'>
                            {format(new Date(transaction.createdAt), 'hh:mm a')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-10 py-8'>
                      <div className='flex items-center gap-3'>
                        <Building2 className='w-4 h-4 text-primary opacity-20 group-hover:opacity-100 transition-opacity' />
                        <div>
                          <p className='text-sm font-bold text-on-surface group-hover:text-primary transition-colors'>
                            {transaction.listing?.title || 'Unknown Asset'}
                          </p>
                          <p className='text-[10px] font-black text-on-surface-variant opacity-60 tracking-widest'>
                            ID: {transaction._id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-10 py-8'>
                      <span className='text-sm font-black text-on-surface-variant'>
                        ₹
                        {(
                          transaction.grossRent +
                          (transaction.depositAmount || 0)
                        ).toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className='px-10 py-8'>
                      <span className='text-sm font-black text-primary opacity-60'>
                        -₹
                        {transaction.serviceChargeAmount.toLocaleString(
                          'en-IN',
                        )}
                      </span>
                    </td>
                    <td className='px-10 py-8'>
                      <div className='flex items-center gap-2'>
                        <ArrowDownCircle className='w-4 h-4 text-emerald-500 opacity-40' />
                        <span className='text-lg font-black font-headline text-on-surface tracking-tighter'>
                          ₹{transaction.ownerNetPayout.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </td>
                    <td className='px-10 py-8 text-right'>
                      <span
                        className={`capitalize inline-flex items-center px-4 py-1.5 text-[10px] font-black tracking-widest rounded ${
                          transaction.payoutStatus === 'settled'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : transaction.payoutStatus === 'processing'
                              ? 'bg-blue-50 text-blue-600 border border-blue-100'
                              : 'bg-orange-50 text-orange-600 border border-orange-100'
                        }`}
                      >
                        {transaction.payoutStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='py-20 flex flex-col items-center justify-center text-center px-10'>
              <div className='w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-6'>
                <History className='w-10 h-10 text-on-surface-variant opacity-20' />
              </div>
              <h3 className='text-xl font-black text-on-surface mb-2 tracking-tight'>
                No transactions yet
              </h3>
              <p className='text-sm text-on-surface-variant font-medium max-w-sm'>
                Transactions will appear here once bookings are confirmed and
                payments are processed.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bank Account Modal - Adaptive Bottom Drawer */}
      {isBankModalOpen && (
        <div className='fixed inset-0 z-50 flex items-end md:items-center justify-center bg-on-surface/40 backdrop-blur-sm p-0 md:p-6 transition-all duration-300'>
          <div
            className='absolute inset-0'
            onClick={() => !savingBank && setIsBankModalOpen(false)}
          />
          <div className='relative w-full max-w-xl bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-outline-variant/10 animate-in slide-in-from-bottom md:zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto'>
            {/* Mobile Drag Handle */}
            <div className='md:hidden flex justify-center pt-4 pb-2'>
              <div className='w-12 h-1.5 bg-on-surface-variant/10 rounded-full' />
            </div>

            <div className='p-6 md:p-10 border-b border-outline-variant/10'>
              <h3 className='text-xl md:text-2xl font-black text-on-surface tracking-tight mb-2'>
                Bank Account Details
              </h3>
              <p className='text-xs md:text-sm text-on-surface-variant font-medium'>
                Add your Indian bank details for receiving payouts. Admin will process settlements manually via UPI or bank transfer.
              </p>
            </div>

            <form
              onSubmit={handleUpdateBank}
              className='p-6 md:p-10 pb-24 md:pb-10 space-y-4'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black tracking-widest text-on-surface-variant opacity-60'>
                    Account Holder Name
                  </label>
                  <input
                    required
                    value={bankForm.accountHolderName}
                    onChange={(e) =>
                      setBankForm({
                        ...bankForm,
                        accountHolderName: e.target.value,
                      })
                    }
                    className='w-full h-12 px-4 bg-surface-container-low border border-outline-variant/10 rounded font-bold text-sm focus:border-primary outline-none transition-all'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black tracking-widest text-on-surface-variant opacity-60'>
                    Bank Name
                  </label>
                  <input
                    value={bankForm.bankName}
                    onChange={(e) =>
                      setBankForm({ ...bankForm, bankName: e.target.value })
                    }
                    className='w-full h-12 px-4 bg-surface-container-low border border-outline-variant/10 rounded font-bold text-sm focus:border-primary outline-none transition-all'
                    placeholder='e.g. HDFC Bank'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-[10px] font-black tracking-widest text-on-surface-variant opacity-60'>
                  Account Number
                </label>
                <input
                  required
                  value={bankForm.accountNumber}
                  onChange={(e) =>
                    setBankForm({ ...bankForm, accountNumber: e.target.value })
                  }
                  className='w-full h-12 px-4 bg-surface-container-low border border-outline-variant/10 rounded font-bold text-sm focus:border-primary outline-none transition-all'
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black tracking-widest text-on-surface-variant opacity-60'>
                    IFSC Code
                  </label>
                  <input
                    required
                    value={bankForm.ifsc}
                    onChange={(e) =>
                      setBankForm({ ...bankForm, ifsc: e.target.value })
                    }
                    className='w-full h-12 px-4 bg-surface-container-low border border-outline-variant/10 rounded font-bold text-sm focus:border-primary outline-none transition-all'
                    placeholder='e.g. HDFC0001234'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black tracking-widest text-on-surface-variant opacity-60'>
                    UPI ID (Optional)
                  </label>
                  <input
                    value={bankForm.upiId}
                    onChange={(e) =>
                      setBankForm({ ...bankForm, upiId: e.target.value })
                    }
                    className='w-full h-12 px-4 bg-surface-container-low border border-outline-variant/10 rounded font-bold text-sm focus:border-primary outline-none transition-all'
                    placeholder='yourname@upi'
                  />
                </div>
              </div>

              <div className='pt-3 flex flex-row gap-4'>
                <Button
                  type='button'
                  size='sm'
                  variant='outline'
                  disabled={savingBank}
                  onClick={() => setIsBankModalOpen(false)}
                  className='flex-1 '
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  size='sm'
                  disabled={savingBank}
                  className='flex-[2]'
                >
                  {savingBank ? (
                    <div className='w-5 h-5 border-2 border-surface/30 border-t-surface rounded-full animate-spin'></div>
                  ) : (
                    <>
                      <Plus className='w-4 h-4' />
                      Save Details
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
