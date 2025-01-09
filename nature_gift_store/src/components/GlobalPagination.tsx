'use client'
import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { motion } from 'framer-motion'
import { useLocalization } from '@/hooks/useLocalization'

interface PaginationProps<T> {
  items: T[]
  itemsPerPage: number
  children: (children: T[]) => React.ReactNode
}

export const GlobalPagination = <T,>({ items, itemsPerPage, children }: PaginationProps<T>) => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const { localization } = useLocalization()

  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const itemsToDisplay = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  if (items.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-medium mb-2">{localization.noRessourceFound}</h3>
          <p className="text-muted-foreground mb-6">
            {" Try adjusting your filter criteria to find what you're looking for."}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="flex gap-6 flex-col">
      {children(itemsToDisplay)}

      {totalPages > 1 && (
        <Pagination className="flex items-end justify-end">
          <PaginationContent>
            {/* Previous Page */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={e => {
                  e.preventDefault()
                  handlePageChange(currentPage - 1)
                }}
                isActive={currentPage > 1}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      handlePageChange(pageNumber)
                    }}
                    isActive={pageNumber === currentPage}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            {/* Next Page */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={e => {
                  e.preventDefault()
                  handlePageChange(currentPage + 1)
                }}
                isActive={currentPage < totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
