'use server';

export default async function TermsOfUsePage() {
  return (
    <div className='space-y-10 w-200'>
      <section id='welcome-to-clypsera' className='scroll-mt-32'>
        <h2 className='text-4xl font-bold secondary-color'>
          Welcome to Clypsera
        </h2>
        <p className='mt-2 text-lg font-semibold'>
          By using our platform, you agree to follow the terms and conditions
          set forth below. Clypsera provides structured and verified data
          related to cleft lip and palate cases, intended for healthcare
          professionals, researchers, and approved users.
        </p>
        <hr className='my-4 border-1' />
      </section>

      <section id='account-usage' className='scroll-mt-32'>
        <h2 className='text-4xl font-bold secondary-color'>Account Usage</h2>
        <p className='mt-2 text-lg font-semibold'>
          Users may register accounts to access restricted features. You are
          responsible for providing accurate information and safeguarding your
          login credentials. Unauthorized use, data manipulation, or unethical
          behavior will result in account suspension or removal.
        </p>
        <hr className='my-4 border-1' />
      </section>

      <section id='data-policy' className='scroll-mt-32'>
        <h2 className='text-4xl font-bold secondary-color'>Data Policy</h2>
        <p className='mt-2 text-lg font-semibold'>
          Submitted data must be accurate and is subject to a verification
          process before being published. All data is to be used only for
          medical, educational, or research purposes aligned with ethical
          standards. Redistribution or commercial use is prohibited.
        </p>
        <hr className='my-4 border-1' />
      </section>

      <section id='intellectual-property' className='scroll-mt-32'>
        <h2 className='text-4xl font-bold secondary-color'>
          Intellectual Property
        </h2>
        <p className='mt-2 text-lg font-semibold'>
          All content on this platform is owned by Clypsera or its contributors
          unless otherwise specified. No part of the content may be copied or
          reused without written permission.
        </p>
        <hr className='my-4 border-1' />
      </section>

      <section id='changes-to-terms' className='scroll-mt-32'>
        <h2 className='text-4xl font-bold secondary-color'>Changes to Terms</h2>
        <p className='mt-2 text-lg font-semibold'>
          We may update these terms at any time. Continued use of the platform
          after changes are published constitutes your acceptance of the revised
          terms.
        </p>
      </section>
    </div>
  );
}
