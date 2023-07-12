import React from "react";

const Help = () => {
  const faqs = [
    {
      question: "What is Litebulb?",
      answer:
        "Litebulb is a powerful platform designed to connect and empower entrepreneurs. It serves as a hub where aspiring founders can find co-founders, attract early adopters, connect with investors, and receive support in shaping their startup ideas.",
    },
    {
      question: "How does Litebulb work?",
      answer:
        "Litebulb operates on the concept of problem statements. Entrepreneurs can submit problem statements related to their startup ideas, and the community can vouch for them. This helps in finding like-minded co-founders and early adopters who resonate with the vision.",
    },
    {
      question: "What are the AI-driven features in Litebulb?",
      answer:
        " Litebulb's Version 2 incorporates cutting-edge AI technologies. ChatGPT provides assistance in generating innovative ideas and shaping business plans, while DALL-E enables entrepreneurs to create visually captivating branding assets.",
    },
    {
      question:
        "Can I use Litebulb even if I don't have a fully formed startup idea?",
      answer:
        "Absolutely! Litebulb is a platform for idea exploration and collaboration. You can use it to refine your ideas, seek feedback, and connect with potential co-founders or early adopters who can help shape your vision.",
    },
    {
      question: "Is Litebulb only for tech startups?",
      answer:
        "No, Litebulb is not limited to any specific industry or sector. It welcomes entrepreneurs from diverse backgrounds, catering to startups in technology, consumer goods, services, social impact, and more.",
    },
    {
      question: "How can Litebulb help me with funding?",
      answer:
        "Litebulb provides access to a network of investors actively seeking innovative opportunities. By showcasing your startup and gaining visibility within the community, you increase your chances of attracting seed round investments.",
    },
    {
      question: "Is Litebulb free to use?",
      answer:
        "Yes, Litebulb offers a free membership plan that allows entrepreneurs to access the platform's core features. However, certain premium features may be available under a paid subscription plan in the future.",
    },
    {
      question: "Can I join Litebulb if I already have a startup?",
      answer:
        "Absolutely! Litebulb welcomes entrepreneurs at all stages of their journey. Whether you're just starting out or have an established startup, Litebulb offers valuable networking and collaboration opportunities.",
    },
    {
      question: "How can I get started with Litebulb?",
      answer:
        "To get started, simply visit our website http://litebulb.xyz and sign up for an account. Once registered, you can explore problem statements, connect with other entrepreneurs, and start building meaningful relationships within the Litebulb community.",
    },
    {
      question: "Where can I find support if I have further questions?",
      answer: `If you have any additional questions or need support, please reach out to our dedicated customer support team at shanzilx101@gmail.com . We're here to assist you on your entrepreneurial journey. make object ot these faqs then render them here in help component import React from "react".`,
    },
  ];

  return (
    <div className='my-24 sm:w-10/12 w-11/12 mx-auto'>
      <h1 className='my-7 sm:text-3xl text-2xl font-medium'>FAQS</h1>
      <div className='p-[1px] border-2 border-red-400 rounded-xl'>
        <div className='border-2 border-red-400 rounded-xl'>
          {faqs.map((faq, index) => (
            <div key={index} className='m-4'>
              <h2 className='sm:text-xl text-lg font-medium'>{faq.question}</h2>
              <p className='sm:text-lg text-base'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
