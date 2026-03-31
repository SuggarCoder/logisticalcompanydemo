import ChooseUs from '~/components/Us'
import WarehouseShow from '~/components/Warehouse'
import Carshow from '~/components/CarShow'
import Testimonal from '~/components/Testimonal'
import IndexForm from '~/components/IndexForm'
import SectionIndexTop from '~/components/SectionIndexTop'
import TopCarousel from '~/components/TopCarousel'

export default function Index() {
  return (
    <div class='overflow-x-hidden'>
      <TopCarousel />
      <SectionIndexTop />
      <IndexForm />
      <Testimonal />
      <Carshow />
      <WarehouseShow />
      <ChooseUs />
    </div>
  )
}