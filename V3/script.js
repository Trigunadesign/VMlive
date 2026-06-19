// VM Live V3 - Interaction & Modal Management

document.addEventListener("DOMContentLoaded", () => {
  // Databases for Projects and Categories
  const projectDetailsData = {
    "01": {
      title: "MG Motors Showrooms",
      desc: "Complete design, fixture fabrication, and signage rollout for 80+ national showrooms across India. Providing a consistent and high-end automotive retail experience.",
      client: "MG Motors India",
      scope: "Showroom design layout, metal & wooden display fixture fabrication, exterior 3D branding, LED signage systems, and regional rollout execution.",
      highlights: "Standardized dealership guidelines, precision engineering of vehicle presentation zones, and seamless project management across multiple cities.",
      materials: "Premium alloy frames, custom LED light sheets, acrylic signages, high-gloss MDF panels.",
      image: "assets/pptx/selected/image12.png"
    },
    "02": {
      title: "Hewlett Packard Deploys",
      desc: "Wooden & metal modular display units custom engineered and manufactured for 40+ technology showrooms across the country to create an interactive customer hub.",
      client: "Hewlett Packard (HP)",
      scope: "Industrial design, prototyping, bulk production of modular tables, security wire routing integration, and POSM fixtures.",
      highlights: "Value engineering for flat-pack shipping, integrated plug-and-play electrical wiring, and high-footfall durability testing.",
      materials: "Marine plywood, textured laminates, powder-coated structural steel, custom acrylic stands.",
      image: "assets/pptx/fixtures/image15.png"
    },
    "03": {
      title: "Simple Energy EV Outlets",
      desc: "Turnkey design, fabrication, and structural layout execution for 15+ Electric Vehicle experience showrooms, setting a futuristic template for eco-retail.",
      client: "Simple Energy",
      scope: "Turnkey interior execution, charging bay setup, wall branding panels, reception tables, and interactive vehicle pedestals.",
      highlights: "Modern green-minimalist aesthetic, smart touch-point integrations, and high-quality electrical safety standards.",
      materials: "Tempered glass, structural steel framing, green vinyl accents, integrated neon LED lighting strips.",
      image: "assets/pptx/selected/image83.png"
    },
    "04": {
      title: "Suzuki Display Zones",
      desc: "Complete premium wooden display zones engineered and deployed in 34+ stores across India, highlighting the latest Suzuki premium models.",
      client: "Suzuki Motorcycles India",
      scope: "Zoning layouts, floor platforms, backdrops, accessory shelves, and promotional point-of-sale displays.",
      highlights: "Heavy-duty motorcycle platforms, premium wood panel joinery, and standardized modular layout matching multi-brand store specs.",
      materials: "Finished teak wood sheets, matte laminate skins, elevated heavy-load metal bases, backlit logos.",
      image: "assets/pptx/selected/image72.png"
    }
  };

  const categoryDetailsData = {
    "Retail Planning": {
      title: "Retail Planning",
      desc: "Detailed spacing layouts, customer flow zoning, and 3D architectural mockups designed to maximize brand impact and retail space productivity.",
      client: "Commercial & Retail Space",
      scope: "Strategic floor planning, custom counter alignments, traffic simulation, 3D CAD blueprints, and visual merchandising guidelines.",
      highlights: "Optimized store layouts that increase customer dwell time and improve conversion rates by up to 25%.",
      materials: "AutoCAD & 3ds Max visualization, spatial routing designs, architectural plans.",
      image: "assets/pptx/selected/image99.png"
    },
    "Precise Joinery": {
      title: "Precise Joinery",
      desc: "Premium wood craftsmanship and custom metal joinery manufactured in our in-house facility to guarantee robust structure and luxury appeal.",
      client: "Bespoke Fixture Engineering",
      scope: "Precision wooden routing, concealed locking mechanisms, zero-tolerance gaps, edgebanding, and lacquer spray booth finishes.",
      highlights: "Concealed structural joints that withstand maximum retail traffic while maintaining a clean, premium visual aesthetic.",
      materials: "Teak veneers, premium laminates, metal sheets, CNC precision carving machines.",
      image: "assets/pptx/selected/image18.png"
    },
    "Identity Systems": {
      title: "Identity Systems",
      desc: "Converting corporate and retail branding blueprints into high-visibility physical signage networks and exterior shopfront facades.",
      client: "Brand & Facade Identity",
      scope: "Backlit LED channels, 3D metal letters, customized corporate signage, thermoformed acrylic shapes, and facade panel installations.",
      highlights: "High-lumen uniform LED diffusion preventing dark spots, engineered for outdoor weather resistance.",
      materials: "Imported acrylic sheets, Samsung LED modules, ACP sheet cladding, premium aluminum profiles.",
      image: "assets/pptx/selected/image97.png"
    },
    "Cosmetic Arenas": {
      title: "Cosmetic Arenas",
      desc: "Bespoke retail cosmetic counters and sensory tester display bars optimized for premium appearance, integrated smart lighting, and customer trials.",
      client: "Luxury POSM & Cosmetics",
      scope: "Countertops, integrated backlit vanity mirrors, glass display drawers, modular security locks, and branding graphics integration.",
      highlights: "CRI 90+ customized cosmetic makeup lighting that accurately represents makeup color profiles for customers.",
      materials: "Ultra-clear glass, high-gloss acrylic, warm-white LED strips, heavy-duty soft-close drawer sliders.",
      image: "assets/pptx/fixtures/image56.png"
    },
    "Exhibition Pavilions": {
      title: "Exhibition Pavilions",
      desc: "Dynamic, fast-assembly modular exhibition stalls and brand launch pavilions constructed to dominate trade-show floor spaces.",
      client: "B2B Events & Expos",
      scope: "Double-decker structural planning, truss rigging, graphic backdrops, custom meeting lounge furniture, and short-notice teardowns.",
      highlights: "Fully reusable modular framework designed for zero waste, allowing quick setup in less than 48 hours.",
      materials: "Heavy-duty structural iron trusses, printed tension fabrics, carpet flooring, decorative spot-lights.",
      image: "assets/pptx/selected/image38.png"
    }
  };

  const modal = document.getElementById("case-study-modal");
  if (modal) {
    const modalClose = modal.querySelector(".apple-modal-close");
    const modalImg = document.getElementById("modal-img");
    const modalNum = document.getElementById("modal-num");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalClient = document.getElementById("modal-client");
    const modalScope = document.getElementById("modal-scope");
    const modalHighlights = document.getElementById("modal-highlights");
    const modalMaterials = document.getElementById("modal-materials");
    const modalActionBtn = modal.querySelector(".apple-modal-btn");

    // Modal Grid Labels
    const modalLabel1 = document.getElementById("modal-label-1");
    const modalLabel2 = document.getElementById("modal-label-2");
    const modalLabel3 = document.getElementById("modal-label-3");
    const modalLabel4 = document.getElementById("modal-label-4");

    const setupModalLabels = (isCategory) => {
      if (isCategory) {
        if (modalLabel1) modalLabel1.textContent = "Domain";
        if (modalLabel2) modalLabel2.textContent = "Scope";
        if (modalLabel3) modalLabel3.textContent = "Key Objective";
        if (modalLabel4) modalLabel4.textContent = "Execution Details";
        if (modalActionBtn) modalActionBtn.textContent = "Enquire About This Service";
      } else {
        if (modalLabel1) modalLabel1.textContent = "Client";
        if (modalLabel2) modalLabel2.textContent = "Scope";
        if (modalLabel3) modalLabel3.textContent = "Key Highlights";
        if (modalLabel4) modalLabel4.textContent = "Materials";
        if (modalActionBtn) modalActionBtn.textContent = "Enquire About This Project";
      }
    };

    // Open for Projects
    document.querySelectorAll(".open-case-study").forEach((btn) => {
      btn.addEventListener("click", () => {
        const projId = btn.getAttribute("data-project");
        const data = projectDetailsData[projId];
        if (!data) return;

        setupModalLabels(false);

        // Populate modal content
        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalNum.textContent = `0${projId} / 04`;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalClient.textContent = data.client;
        modalScope.textContent = data.scope;
        modalHighlights.textContent = data.highlights;
        modalMaterials.textContent = data.materials;

        // Show modal
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
      });
    });

    // Open for Categories
    document.querySelectorAll(".open-category").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const catName = btn.getAttribute("data-cat");
        const data = categoryDetailsData[catName];
        if (!data) return;

        setupModalLabels(true);

        // Populate modal content
        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalNum.textContent = `0${index + 1} / 05`;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalClient.textContent = data.client;
        modalScope.textContent = data.scope;
        modalHighlights.textContent = data.highlights;
        modalMaterials.textContent = data.materials;

        // Show modal
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });

    // Close modal logic
    const closeModal = () => {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = ""; // Restore scrolling
    };

    if (modalClose) {
      modalClose.addEventListener("click", (e) => {
        e.stopPropagation();
        closeModal();
      });
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });

    if (modalActionBtn) {
      modalActionBtn.addEventListener("click", () => {
        closeModal();
      });
    }
  }
});
