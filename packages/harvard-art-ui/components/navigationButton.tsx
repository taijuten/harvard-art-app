import Link from "next/link";
import { Button } from "react-bootstrap";

const NavigationButton = ({ currentPage, isNext = false }) => {
  const pageNumberToNavigate = isNext ? currentPage + 1 : currentPage - 1
  const content = isNext ? "Next »" : "« Previous"
  return pageNumberToNavigate < 1
    ? null
    : (
      <Link href={`?p=${pageNumberToNavigate}`} passHref><Button color='default' className='my-3 pagination'>{content}</Button></Link>
    )
}

export default NavigationButton
