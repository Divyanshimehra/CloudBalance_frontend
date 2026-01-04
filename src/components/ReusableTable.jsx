import { Table, TableCell, TableHead, TableRow, TableBody} from "@mui/material";

export default function ReusableTable({columns, rows, renderActions}) {
    return (
            <Table className="w-full border border-gray-300 mt-4">
                <TableHead>
                    <TableRow className="bg-blue-100 text-gray-700 font-semibold">
                        {columns.map((col) => (
                            <TableCell 
                                key={col.field} 
                                className="border border-gray-300 px-4 py-2"
                            >
                                {col.headerName}
                            </TableCell>
                        ))}
                        {renderActions && (
                            <TableCell className="border border-gray-300 px-4 py-2">
                                Actions
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.id ?? index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                            {columns.map((col) => (
                                <TableCell 
                                    key={col.field} 
                                    className="border border-gray-300 px-4 py-2"
                                >
                                    {col.render
                                    ? col.render(row[col.field], row)
                                    : row[col.field]}
                                </TableCell>
                            ))}
                            {renderActions && (
                                <TableCell className="border border-gray-300 px-4 py-2">
                                    {renderActions(row)}
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    )
}