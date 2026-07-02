import { setDoc, doc, addDoc, collection, getDocs, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { containers } from './containers';

interface SeedItem {
  name: string;
  quantity: number;
  category: string;
  tags: string[];
  containerId: string;
}

const seedItems: SeedItem[] = [
  // table1-left-top — Microcontrollers
  { name: 'STM32 Nucleo-H743ZI', quantity: 2, category: 'Microcontrollers', tags: ['STM32', 'ARM', 'dev-board'], containerId: 'table1-left-top' },
  { name: 'ESP32-S3 DevKit', quantity: 5, category: 'Microcontrollers', tags: ['ESP32', 'WiFi', 'BLE'], containerId: 'table1-left-top' },
  { name: 'Arduino Nano Every', quantity: 3, category: 'Microcontrollers', tags: ['Arduino', 'ATmega', '5V'], containerId: 'table1-left-top' },

  // table1-left-middle — 3D Printing (Hotends)
  { name: 'Bambu Lab P1S Hotend Assembly', quantity: 2, category: '3D Printing', tags: ['Bambu', 'hotend', 'P1S'], containerId: 'table1-left-middle' },
  { name: '0.4mm Hardened Steel Nozzles', quantity: 8, category: '3D Printing', tags: ['nozzle', 'hardened', '0.4mm'], containerId: 'table1-left-middle' },
  { name: 'Silicone Sock for Hotend', quantity: 4, category: '3D Printing', tags: ['silicone', 'thermal', 'hotend'], containerId: 'table1-left-middle' },

  // table1-left-bottom — Filaments
  { name: 'TPU 95A Filament 1kg — Black', quantity: 2, category: '3D Printing', tags: ['TPU', 'flexible', 'filament'], containerId: 'table1-left-bottom' },
  { name: 'PLA Carbon Fiber Filament 1kg', quantity: 1, category: '3D Printing', tags: ['PLA', 'carbon-fiber', 'filament'], containerId: 'table1-left-bottom' },
  { name: 'PETG Clear Filament 1kg', quantity: 3, category: '3D Printing', tags: ['PETG', 'clear', 'filament'], containerId: 'table1-left-bottom' },

  // table1-right-top — Single Board Computers
  { name: 'Jetson Nano 4GB Developer Kit', quantity: 1, category: 'Single Board Computers', tags: ['NVIDIA', 'Jetson', 'AI', 'GPU'], containerId: 'table1-right-top' },
  { name: 'LattePanda 3 Delta 864', quantity: 1, category: 'Single Board Computers', tags: ['LattePanda', 'x86', 'Windows'], containerId: 'table1-right-top' },
  { name: 'Raspberry Pi 5 — 8GB', quantity: 2, category: 'Single Board Computers', tags: ['RPi', 'ARM', 'Linux'], containerId: 'table1-right-top' },

  // table1-right-middle — Motion
  { name: 'NEMA 17 Stepper Motor 48mm', quantity: 6, category: 'Motion', tags: ['stepper', 'NEMA17', 'motor'], containerId: 'table1-right-middle' },
  { name: 'TMC2209 Stepper Driver', quantity: 4, category: 'Motion', tags: ['TMC2209', 'driver', 'silent'], containerId: 'table1-right-middle' },
  { name: 'GT2 Timing Belt — 2m Length', quantity: 3, category: 'Motion', tags: ['GT2', 'belt', 'timing'], containerId: 'table1-right-middle' },

  // table1-right-bottom — Fasteners
  { name: 'M3×8mm Socket Head Cap Screws', quantity: 100, category: 'Fasteners', tags: ['M3', 'SHCS', 'metric'], containerId: 'table1-right-bottom' },
  { name: 'M3 Hammer Head T-Nuts', quantity: 50, category: 'Fasteners', tags: ['M3', 'T-nut', 'extrusion'], containerId: 'table1-right-bottom' },
  { name: 'M5×10mm Button Head Screws', quantity: 40, category: 'Fasteners', tags: ['M5', 'BHCS', 'metric'], containerId: 'table1-right-bottom' },

  // table2-left-front-top — Pneumatics (Actuators)
  { name: 'Pneumatic Cylinder 16mm Bore', quantity: 4, category: 'Pneumatics', tags: ['cylinder', 'actuator', '16mm'], containerId: 'table2-left-front-top' },
  { name: '6mm Push-In Fittings', quantity: 12, category: 'Pneumatics', tags: ['fitting', 'push-in', '6mm'], containerId: 'table2-left-front-top' },

  // table2-left-front-middle — Pneumatics (Tubing)
  { name: 'Silicone Tubing 4mm ID — 5m', quantity: 1, category: 'Pneumatics', tags: ['silicone', 'tubing', '4mm'], containerId: 'table2-left-front-middle' },
  { name: 'Polyurethane Tube 6mm OD — 3m', quantity: 1, category: 'Pneumatics', tags: ['PU', 'tubing', '6mm'], containerId: 'table2-left-front-middle' },

  // table2-left-front-bottom — Pneumatics (Valves)
  { name: '24V Solenoid Valve 2-Way', quantity: 3, category: 'Pneumatics', tags: ['solenoid', 'valve', '24V'], containerId: 'table2-left-front-bottom' },
  { name: 'Manual Flow Control Valve', quantity: 4, category: 'Pneumatics', tags: ['flow-control', 'valve', 'manual'], containerId: 'table2-left-front-bottom' },

  // table2-left-back-top — Horology (Movements)
  { name: 'Miyota 2035 Quartz Movement', quantity: 6, category: 'Horology', tags: ['Miyota', 'quartz', 'movement'], containerId: 'table2-left-back-top' },
  { name: 'NH35 Automatic Movement', quantity: 2, category: 'Horology', tags: ['NH35', 'automatic', 'Seiko'], containerId: 'table2-left-back-top' },

  // table2-left-back-middle — Horology (Hands)
  { name: 'Sweeping Second Hands — Assorted', quantity: 20, category: 'Horology', tags: ['hands', 'seconds', 'assorted'], containerId: 'table2-left-back-middle' },
  { name: 'Hour/Minute Hand Set — Silver', quantity: 10, category: 'Horology', tags: ['hands', 'hour', 'minute'], containerId: 'table2-left-back-middle' },

  // table2-left-back-bottom — Horology (Accessories)
  { name: 'Watch Case Back Gaskets — Assorted', quantity: 30, category: 'Horology', tags: ['gasket', 'caseback', 'sealing'], containerId: 'table2-left-back-bottom' },
  { name: 'Sapphire Crystal 30mm Flat', quantity: 5, category: 'Horology', tags: ['sapphire', 'crystal', '30mm'], containerId: 'table2-left-back-bottom' },

  // table2-right-front-top — Voron (Rails)
  { name: 'MGN9H Linear Rail — 300mm', quantity: 6, category: 'Voron Build', tags: ['linear-rail', 'MGN9H', '300mm'], containerId: 'table2-right-front-top' },
  { name: 'MGN9H Rail Carriage', quantity: 6, category: 'Voron Build', tags: ['carriage', 'MGN9H', 'linear'], containerId: 'table2-right-front-top' },

  // table2-right-front-middle — Voron (Parts)
  { name: 'Voron 2.4 Printed Parts Set (ABS)', quantity: 1, category: 'Voron Build', tags: ['Voron', 'printed-parts', 'ABS'], containerId: 'table2-right-front-middle' },
  { name: 'Stealthburner Toolhead Kit', quantity: 1, category: 'Voron Build', tags: ['Stealthburner', 'toolhead', 'Voron'], containerId: 'table2-right-front-middle' },

  // table2-right-front-bottom — Voron (Thermal)
  { name: '200W Heater Cartridge 24V', quantity: 4, category: 'Voron Build', tags: ['heater', 'cartridge', '200W'], containerId: 'table2-right-front-bottom' },
  { name: 'NTC 100K Thermistor', quantity: 6, category: 'Voron Build', tags: ['thermistor', 'NTC', '100K'], containerId: 'table2-right-front-bottom' },
  { name: 'Bi-Metal Heatbreak — Titanium', quantity: 3, category: 'Voron Build', tags: ['heatbreak', 'titanium', 'bi-metal'], containerId: 'table2-right-front-bottom' },

  // table2-right-back-top — Electrical (Connectors)
  { name: 'JST-XH Connector Kit', quantity: 1, category: 'Electrical', tags: ['JST-XH', 'connector', 'kit'], containerId: 'table2-right-back-top' },
  { name: 'XT60 Male/Female Pair', quantity: 10, category: 'Electrical', tags: ['XT60', 'connector', 'power'], containerId: 'table2-right-back-top' },
  { name: 'Silicone Wire 18AWG — 5m Red', quantity: 1, category: 'Electrical', tags: ['wire', '18AWG', 'silicone'], containerId: 'table2-right-back-top' },

  // table2-right-back-middle — Electrical (Prototyping)
  { name: 'DuPont Jumper Wires M-F 40pcs', quantity: 1, category: 'Electrical', tags: ['jumper', 'DuPont', 'M-F'], containerId: 'table2-right-back-middle' },
  { name: 'DuPont Jumper Wires M-M 40pcs', quantity: 1, category: 'Electrical', tags: ['jumper', 'DuPont', 'M-M'], containerId: 'table2-right-back-middle' },
  { name: 'Breadboard 830-Point', quantity: 3, category: 'Electrical', tags: ['breadboard', 'prototyping', '830'], containerId: 'table2-right-back-middle' },

  // table2-right-back-bottom — Electrical (Misc)
  { name: 'Heat Shrink Tubing — Assorted', quantity: 100, category: 'Electrical', tags: ['heat-shrink', 'tubing', 'assorted'], containerId: 'table2-right-back-bottom' },
  { name: 'Nylon Cable Ties 150mm', quantity: 50, category: 'Electrical', tags: ['cable-tie', 'nylon', '150mm'], containerId: 'table2-right-back-bottom' },
  { name: 'Kapton Tape 10mm × 30m', quantity: 2, category: 'Electrical', tags: ['Kapton', 'tape', 'heat-resistant'], containerId: 'table2-right-back-bottom' },
];

export async function seedDatabase(): Promise<void> {
  console.log('🌱 Seeding database...');

  // Step 1: Write all container documents
  console.log(`📦 Writing ${containers.length} containers...`);
  for (const container of containers) {
    await setDoc(doc(db, 'containers', container.id), {
      table: container.table,
      side: container.side,
      depth: container.depth,
      position: container.position,
      label: container.label,
    });
  }
  console.log('✅ Containers written.');

  // Step 2: Write all item documents
  console.log(`🔧 Writing ${seedItems.length} items...`);
  for (const item of seedItems) {
    await addDoc(collection(db, 'items'), {
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      tags: item.tags,
      containerId: item.containerId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }
  console.log(`✅ ${seedItems.length} items written.`);

  console.log('🎉 Database seeding complete!');
}

export async function clearDatabase(): Promise<void> {
  console.log('🗑️ Clearing all items...');

  const snapshot = await getDocs(collection(db, 'items'));
  const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, 'items', d.id)));
  await Promise.all(deletePromises);

  console.log(`✅ Deleted ${snapshot.size} items.`);
}
