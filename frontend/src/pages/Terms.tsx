import { Box } from "@mui/material";
import { PageFooter } from "../components/sections/PageFooter";
import { Section } from "../components/sections/Section";
import { Navigation } from "../components/sections/Navigation";

export const Terms = () => {
  return (
    <Box>
      <Navigation />
      <Section>
        <>
          <Box sx={{ width: "100%", position: "relative" }}>
            <Box sx={{ position: "absolute", top: "-30px", right: "0" }}>
              <p>13.01.2024</p>
            </Box>
            <h1>Terms of Service</h1>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Waill, you agree to be bound by these Terms
              of Service. If you do not agree with these terms, please refrain
              from using our service.
            </p>
            <h2>2. Description of Service</h2>
            <p>
              Waill provides a platform for users to integrate personal
              documents into GPT Prompts. Users can upload files to Waill, which
              will extract and save the files knowledge with the help of OpenAIs
              API to be accessed using GPT. Waill may store user data for
              identification, authorization, and functional purposes.
            </p>
            <h2>3. User Responsibilities</h2>
            <p>
              Users are responsible for the accuracy and legality of the
              documents uploaded. Users must not violate any applicable laws or
              infringe upon the rights of others.
            </p>
            <h2>4. Privacy</h2>
            <p>
              User data is handled in accordance with our Privacy Policy, which
              can be found <a href="/privacy">here</a>.
            </p>
            <h2>5. Third-Party Services</h2>
            <p>
              Waill may use third-party services for authorization and
              functional processes. Users acknowledge and agree to the terms of
              use and privacy policies of such third parties.
            </p>
            <h2>6. Sensitive Data</h2>
            <p>
              Users must handle sensitive data like OpenAI API Keys with care.
              Waill is not responsible for any misuse or unauthorized access
              resulting from the mishandling of API Keys. Users are encouraged
              to follow best practices for securing and managing API Keys.
            </p>
            <h2>7. Intellectual Property</h2>
            <p>
              Users retain ownership of their documents. By using Waill, users
              grant Waill the right to use, process, forward, and store the
              uploaded documents for the sole purpose of providing the service.
            </p>
            <h2>8. Limitation of Liability</h2>
            <p>
              Waill is not liable for any damages or losses resulting from the
              use of the service. Users agree to use Waill at their own risk.
            </p>
            <h2>9. Changes to Terms of Service</h2>
            <p>
              Waill reserves the right to update these Terms of Service. Users
              will be notified of any changes, and continued use of the service
              constitutes acceptance of the modified terms.
            </p>
            <h2>10. Termination</h2>
            <p>
              Waill may terminate or suspend access to the service without prior
              notice for any violation of these terms.
            </p>
            <h2>11. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance
              with the laws of Germany.
            </p>
            <p>
              For any questions or concerns regarding these Terms of Service,
              please contact contact@waill.net.
            </p>
          </Box>
        </>
      </Section>
      <PageFooter />
    </Box>
  );
};
