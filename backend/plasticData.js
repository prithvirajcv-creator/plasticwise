
const plasticData = [
  {
    code: 1,
    name: "Polyethylene Terephthalate",
    abbreviation: "PET / PETE",
    commonUses: [
      "Water bottles",
      "Soft drink bottles",
      "Food packaging",
      "Cooking oil containers"
    ],
    characteristics: [
      "Lightweight",
      "Transparent",
      "Good barrier properties"
    ],
    reuseGuidance:
      "Many PET beverage bottles are designed for single use. Follow the manufacturer's instructions. Avoid reusing bottles that are damaged, scratched, or difficult to clean.",
    recyclingGuidance:
      "PET is widely recycled where collection and processing facilities exist. Empty the container and follow local recycling instructions.",
    environmentalConsiderations:
      "PET can be recycled into fibres, packaging and other products. Improper disposal can contribute to persistent plastic pollution.",
    importantNote:
      "The resin code identifies PET material. It does not establish the bottle's individual recycling history."
  },
  {
    code: 2,
    name: "High-Density Polyethylene",
    abbreviation: "HDPE",
    commonUses: [
      "Milk containers",
      "Detergent bottles",
      "Shampoo bottles",
      "Household chemical containers"
    ],
    characteristics: [
      "Strong",
      "Relatively rigid",
      "Good chemical resistance"
    ],
    reuseGuidance:
      "Reuse depends on the original contents and container design. Never reuse chemical containers for food or drinking water.",
    recyclingGuidance:
      "HDPE is commonly accepted in many recycling systems. Empty and clean containers according to local guidelines.",
    environmentalConsiderations:
      "HDPE can be mechanically recycled into products such as pipes, containers and plastic lumber.",
    importantNote:
      "Not every HDPE container is accepted by every local recycling programme."
  },
  {
    code: 3,
    name: "Polyvinyl Chloride",
    abbreviation: "PVC",
    commonUses: [
      "Pipes",
      "Cable insulation",
      "Some packaging",
      "Construction materials"
    ],
    characteristics: [
      "Durable",
      "Can be rigid or flexible",
      "Chemical composition varies with additives"
    ],
    reuseGuidance:
      "Use PVC products only for their intended purpose. Food-contact suitability depends on the specific product and applicable standards.",
    recyclingGuidance:
      "PVC recycling requires suitable collection and specialised processing. Check local recycling facilities.",
    environmentalConsiderations:
      "PVC products may contain different additives. Improper burning can release hazardous substances.",
    importantNote:
      "Do not burn PVC or assume that every PVC product has the same composition."
  },
  {
    code: 4,
    name: "Low-Density Polyethylene",
    abbreviation: "LDPE",
    commonUses: [
      "Plastic bags",
      "Flexible packaging",
      "Squeeze bottles",
      "Plastic films"
    ],
    characteristics: [
      "Flexible",
      "Lightweight",
      "Moisture resistant"
    ],
    reuseGuidance:
      "Reuse depends on the product's intended application and condition. Avoid using damaged or contaminated packaging for food.",
    recyclingGuidance:
      "LDPE films and bags may require dedicated collection points. They are not accepted in every household recycling bin.",
    environmentalConsiderations:
      "Thin plastic films can escape waste collection systems and contribute to litter and environmental pollution.",
    importantNote:
      "Check whether your local recycling facility accepts flexible LDPE packaging."
  },
  {
    code: 5,
    name: "Polypropylene",
    abbreviation: "PP",
    commonUses: [
      "Food containers",
      "Bottle caps",
      "Storage containers",
      "Packaging",
      "Household products"
    ],
    characteristics: [
      "Lightweight",
      "Good chemical resistance",
      "Can withstand higher temperatures than some common packaging plastics"
    ],
    reuseGuidance:
      "Follow the manufacturer's instructions. Only use containers for heating if they are explicitly labelled as suitable for that purpose.",
    recyclingGuidance:
      "PP recycling availability varies by location. Empty and clean containers before placing them in an accepted collection stream.",
    environmentalConsiderations:
      "PP can be recycled into various products, but collection and processing availability determine whether recycling occurs.",
    importantNote:
      "The resin code alone does not confirm microwave safety or suitability for repeated food use."
  },
  {
    code: 6,
    name: "Polystyrene",
    abbreviation: "PS",
    commonUses: [
      "Disposable cups",
      "Food trays",
      "Protective packaging",
      "Foam packaging"
    ],
    characteristics: [
      "Can be rigid or foam-based",
      "Lightweight",
      "Useful for insulation and packaging"
    ],
    reuseGuidance:
      "Follow product instructions. Avoid reusing disposable food packaging that is damaged, contaminated or not designed for repeated use.",
    recyclingGuidance:
      "PS recycling is limited in many areas. Check whether local facilities accept rigid or foam polystyrene.",
    environmentalConsiderations:
      "Foam polystyrene can break into smaller pieces and is difficult to collect once dispersed into the environment.",
    importantNote:
      "Rigid PS and expanded polystyrene foam may have different collection and processing requirements."
  },
  {
    code: 7,
    name: "Other Plastics",
    abbreviation: "OTHER",
    commonUses: [
      "Some reusable water bottles",
      "Multilayer packaging",
      "Specialty plastic products",
      "Certain engineering plastics"
    ],
    characteristics: [
      "Can include several different polymers",
      "Properties vary considerably",
      "May contain multilayer materials or blends"
    ],
    reuseGuidance:
      "Do not assume that all code 7 products have the same food-contact or temperature suitability. Check the manufacturer's specifications.",
    recyclingGuidance:
      "Recycling depends on the specific polymer and product design. Some code 7 materials require specialised processing.",
    environmentalConsiderations:
      "The category covers multiple materials, so environmental impacts and recycling pathways cannot be generalised.",
    importantNote:
      "Code 7 does not identify one specific plastic. Additional material information is needed."
  }
];

export default plasticData;
