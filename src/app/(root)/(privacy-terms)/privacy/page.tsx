'use server';

export default async function PrivacyPolicyPage() {
  return (
    <div className='space-y-10 w-200'>
      <section id='introduction' className='scroll-mt-32'>
        <h2 className='text-4xl font-bold secondary-color'>Introduction</h2>
        <p className='mt-2 text-lg font-semibold'>
          At Clypsera, we are committed to protecting your privacy and handling
          your data responsibly. This Privacy Policy outlines how we collect,
          use, store, and safeguard your personal and medical information when
          you interact with our platform.
        </p>
        <hr className='my-4 border-1' />
      </section>

      <section id='information-we-collect' className='scroll-mt-32'>
        <h2 className='text-4xl font-bold secondary-color'>
          Information We Collect
        </h2>
        <p className='mt-2 text-lg font-semibold'>
          We may collect personal information such as your name, email address,
          and institution during account registration. We also collect medical
          data related to cleft lip cases, including patient records, medical
          images, and clinical histories. We log user activity for system
          improvement and security.
        </p>
        <hr className='my-4 border-1' />
      </section>

      <section id='use-of-information' className='scroll-mt-32'>
        <h2 className='text-4xl font-bold secondary-color'>
          Use of Information
        </h2>
        <p className='mt-2 text-lg font-semibold'>
          The information we collect is used to verify and securely publish
          data, enhance user experience, support research and educational
          initiatives, and maintain system security. We do not sell or share
          personal data with third parties for commercial purposes.
        </p>
        <hr className='my-4 border-1' />
      </section>

      <section id='data-sharing-and-disclosure' className='scroll-mt-32'>
        <h2 className='text-4xl font-bold secondary-color'>
          Data Sharing and Disclosure
        </h2>
        <p className='mt-2 text-lg font-semibold'>
          Data may be shared with research partners or health institutions after
          anonymization. We will not disclose your personal information without
          your consent unless required by law.
        </p>
        <hr className='my-4 border-1' />
      </section>

      <section id='data-security' className='scroll-mt-32'>
        <h2 className='text-4xl font-bold secondary-color'>Data Security</h2>
        <p className='mt-2 text-lg font-semibold'>
          We implement security measures such as encryption and secured servers
          to protect your data. However, no system is completely risk-free. We
          encourage you to protect your account credentials and report any
          suspicious activity to us immediately.
        </p>
        <hr className='my-4 border-1' />
      </section>

      <section id='policy-updates' className='scroll-mt-32'>
        <h2 className='text-4xl font-bold secondary-color'>Policy Updates</h2>
        <p className='mt-2 text-lg font-semibold'>
          This privacy policy may be updated periodically. Changes will be
          posted on this page and will be effective immediately. We encourage
          users to review this page periodically.
        </p>
      </section>
    </div>
  );
}
