'use server';
import CardNews from './cards/Card-News';

export async function News() {
  return (
    <>
      <div className='flex flex-col items-center mb-20 gap-12 z-10'>
        <p className='text-5xl primary-color font-bold'>Latest News</p>
        <p className='text-[32px] font-semibold'>
          Explore the latest research and updates related to cleft lip and
          palate.
        </p>
        <div className='flex gap-6 justify-between pb-4 items-center'>
          <CardNews
            image='/artikel1.svg'
            title='Healthcare Use and Direct Medical Costs in Cleft Lip and Palate Population'
            description='This study analyzes healthcare utilization and costs for patients with unilateral cleft lip and palate. It found that observed costs exceeded expected protocol-based costs due to optional procedures, with inpatient care and surgeries being the main cost drivers. Implementing the ICHOM Standard Set resulted in a 7% increase in protocol-based costs.'
          />
          <CardNews
            image='/artikel2.svg'
            title='LAMA5 – A New Pathogenic Gene for Non-Syndromic Cleft Lip With or Without Cleft Palate'
            description='This study identified that reduced expression of the LAMA5 gene in mice led to palatal clefts by inhibiting palatal cell proliferation and promoting apoptosis. It suggests LAMA5 may not be involved in EMT but disrupts SHH signaling pathways, positioning it as a new pathogenic gene in non-syndromic cleft lip and/or palate.'
          />
          <CardNews
            image='/artikel3.svg'
            title='Comparison of Two Surgical Protocols for Treating Unilateral Cleft Lip and Palate'
            description='This systematic review and meta-analysis compares patient outcomes between the Oslo protocol and the delayed hard palate closure protocol. While long-term sagittal maxillofacial outcomes were similar, the Oslo protocol was associated with a lower incidence of oronasal fistulas. Overall, findings favored the Oslo protocol.'
          />
        </div>
      </div>
    </>
  );
}
