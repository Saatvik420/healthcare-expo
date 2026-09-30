package com.example.healthcare.config;

import com.example.healthcare.model.Exhibitor;
import com.example.healthcare.model.Sponsorship;
import com.example.healthcare.model.User;
import com.example.healthcare.model.Visitor;
import com.example.healthcare.repository.ExhibitorRepository;
import com.example.healthcare.repository.SponsorshipRepository;
import com.example.healthcare.repository.UserRepository;
import com.example.healthcare.repository.VisitorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final VisitorRepository visitorRepository;
    private final ExhibitorRepository exhibitorRepository;
    private final SponsorshipRepository sponsorshipRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UserRepository userRepository,
            VisitorRepository visitorRepository,
            ExhibitorRepository exhibitorRepository,
            SponsorshipRepository sponsorshipRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.visitorRepository = visitorRepository;
        this.exhibitorRepository = exhibitorRepository;
        this.sponsorshipRepository = sponsorshipRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedVisitors();
        seedExhibitors();
        seedSponsorships();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .uid("usr_admin")
                    .name("Expo Director (Admin)")
                    .email("admin@globalhealthcareexpo.com")
                    .password(passwordEncoder.encode("Admin@Expo2026"))
                    .role("admin")
                    .build();

            User visitor = User.builder()
                    .uid("usr_demo_visitor")
                    .name("Dr. Sarah Jenkins")
                    .email("visitor@example.com")
                    .password(passwordEncoder.encode("visitor123"))
                    .role("visitor")
                    .organization("Apex BioLabs")
                    .designation("Senior Formulation Scientist")
                    .passCode("GHE-2026-881920")
                    .sector("apis")
                    .build();

            User exhibitor = User.builder()
                    .uid("usr_demo_exhibitor")
                    .name("Marcus Sterling")
                    .email("exhibitor@apexbio.com")
                    .password(passwordEncoder.encode("exhibitor123"))
                    .role("exhibitor")
                    .company("NovaForm Chem Ltd")
                    .designation("VP International Sales")
                    .stallType("12 sq.m Prime Scheme")
                    .hall("Hall 1 & 2")
                    .status("Approved")
                    .build();

            userRepository.saveAll(Arrays.asList(admin, visitor, exhibitor));
        }
    }

    private void seedVisitors() {
        if (visitorRepository.count() == 0) {
            Visitor v1 = Visitor.builder()
                    .visitorCode("vis_101")
                    .name("Dr. Sarah Jenkins")
                    .email("visitor@example.com")
                    .phone("+1 415 890 2341")
                    .organization("Apex BioLabs US")
                    .designation("Senior Formulation Scientist")
                    .sector("apis")
                    .sectorLabel("APIs & Fine Chemicals")
                    .passType("vip")
                    .passCode("GHE-2026-881920")
                    .attendDate("Sep 24, 2026")
                    .status("Confirmed")
                    .build();

            Visitor v2 = Visitor.builder()
                    .visitorCode("vis_102")
                    .name("Vikram Singhania")
                    .email("vikram.s@ranbaxy-procure.in")
                    .phone("+91 98110 54321")
                    .organization("Singhania Pharma Dist.")
                    .designation("VP Global Procurement")
                    .sector("finished")
                    .sectorLabel("Finished Formulations")
                    .passType("vip")
                    .passCode("GHE-2026-443198")
                    .attendDate("Sep 25, 2026")
                    .status("Confirmed")
                    .build();

            Visitor v3 = Visitor.builder()
                    .visitorCode("vis_103")
                    .name("Elena Rostova")
                    .email("e.rostova@eurosterile.de")
                    .phone("+49 30 901820")
                    .organization("EuroSterile Systems GmbH")
                    .designation("Cleanroom Engineering Lead")
                    .sector("machinery")
                    .sectorLabel("Pharma Machinery")
                    .passType("standard")
                    .passCode("GHE-2026-620184")
                    .attendDate("Sep 26, 2026")
                    .status("Confirmed")
                    .build();

            Visitor v4 = Visitor.builder()
                    .visitorCode("vis_104")
                    .name("Tariq Al-Mansoor")
                    .email("tariq@gulfpharma.ae")
                    .phone("+971 50 123 4567")
                    .organization("Gulf Health Logistics")
                    .designation("Cold-Chain Operations Director")
                    .sector("packaging")
                    .sectorLabel("Packaging & Delivery")
                    .passType("standard")
                    .passCode("GHE-2026-771239")
                    .attendDate("Sep 27, 2026")
                    .status("Confirmed")
                    .build();

            Visitor v5 = Visitor.builder()
                    .visitorCode("vis_105")
                    .name("Aoi Takahashi")
                    .email("takahashi@kyotobiotech.jp")
                    .phone("+81 3 5555 0192")
                    .organization("Kyoto Peptide Synthesis Corp")
                    .designation("R&D Director")
                    .sector("apis")
                    .sectorLabel("APIs & Fine Chemicals")
                    .passType("vip")
                    .passCode("GHE-2026-905412")
                    .attendDate("Sep 27, 2026")
                    .status("Confirmed")
                    .build();

            visitorRepository.saveAll(Arrays.asList(v1, v2, v3, v4, v5));
        }
    }

    private void seedExhibitors() {
        if (exhibitorRepository.count() == 0) {
            Exhibitor e1 = Exhibitor.builder()
                    .exhibitorCode("exh_201")
                    .company("NovaForm Chem Ltd")
                    .contactPerson("Marcus Sterling")
                    .designation("VP International Sales")
                    .email("exhibitor@apexbio.com")
                    .phone("+44 20 7946 0912")
                    .stallType("12 sq.m Prime Scheme")
                    .hall("Hall 1 & 2 (APIs)")
                    .amount("$3,740")
                    .status("Approved")
                    .bookingDate("Sep 20, 2026")
                    .notes("Requires 2 corner spotlights and priority proximity to buyer lounge.")
                    .build();

            Exhibitor e2 = Exhibitor.builder()
                    .exhibitorCode("exh_202")
                    .company("SynthoMech Machinery Works")
                    .contactPerson("Klaus Reinhardt")
                    .designation("Managing Director")
                    .email("klaus@synthomech.com")
                    .phone("+49 89 2314 55")
                    .stallType("18+ sq.m Raw Bare Space")
                    .hall("Hall 4 (Machinery)")
                    .amount("$5,200")
                    .status("Approved")
                    .bookingDate("Sep 22, 2026")
                    .notes("Heavy rotary press display. Heavy 3-phase 10 kW electrical hookup required.")
                    .build();

            Exhibitor e3 = Exhibitor.builder()
                    .exhibitorCode("exh_203")
                    .company("AeroSeal Sterile Packaging")
                    .contactPerson("Meera Deshmukh")
                    .designation("Head of Business Development")
                    .email("meera@aerosealpack.com")
                    .phone("+91 99201 88472")
                    .stallType("9 sq.m Shell Scheme")
                    .hall("Hall 5 (Packaging)")
                    .amount("$2,750")
                    .status("Pending Review")
                    .bookingDate("Sep 26, 2026")
                    .notes("Requesting corner booth near the primary visitor entrance avenue.")
                    .build();

            Exhibitor e4 = Exhibitor.builder()
                    .exhibitorCode("exh_204")
                    .company("BioGenix Active Intermediates")
                    .contactPerson("Carlos Mendez")
                    .designation("Regional Commercial Director")
                    .email("carlos@biogenix-rx.es")
                    .phone("+34 91 123 4567")
                    .stallType("6 sq.m Shell Scheme")
                    .hall("Hall 1 & 2 (APIs)")
                    .amount("$1,800")
                    .status("Contract Dispatched")
                    .bookingDate("Sep 27, 2026")
                    .notes("Provisional advance received. Waiting for signed exhibitor indemnity clause.")
                    .build();

            exhibitorRepository.saveAll(Arrays.asList(e1, e2, e3, e4));
        }
    }

    private void seedSponsorships() {
        if (sponsorshipRepository.count() == 0) {
            Sponsorship s1 = Sponsorship.builder()
                    .sponsorshipCode("sp_301")
                    .company("Alliance BioTech International")
                    .contactPerson("Dr. Gregory House")
                    .email("ghouse@alliancebio.com")
                    .tier("Platinum Partner")
                    .investment("$18,000")
                    .status("Agreement Signed")
                    .date("Sep 18, 2026")
                    .build();

            Sponsorship s2 = Sponsorship.builder()
                    .sponsorshipCode("sp_302")
                    .company("Pharmatronic Automation Group")
                    .contactPerson("Helen Wu")
                    .email("helen.wu@pharmatronic.sg")
                    .tier("Gold Partner")
                    .investment("$11,000")
                    .status("In Discussion")
                    .date("Sep 25, 2026")
                    .build();

            Sponsorship s3 = Sponsorship.builder()
                    .sponsorshipCode("sp_303")
                    .company("Veloce Therapeutics Global")
                    .contactPerson("Jean-Luc Picard")
                    .email("j.picard@veloce-tx.com")
                    .tier("Official Lanyard Sponsor")
                    .investment("$8,500")
                    .status("Agreement Signed")
                    .date("Sep 26, 2026")
                    .build();

            sponsorshipRepository.saveAll(Arrays.asList(s1, s2, s3));
        }
    }
}
