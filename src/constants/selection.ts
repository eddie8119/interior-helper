import { ProjectTypeSelection, materialUnitSelection } from '@/types/selection'

export const PROJECT_TYPES: ProjectTypeSelection[] = [
  { value: 'residential', label: '住宅' },
  { value: 'luxury', label: '豪宅' },
  { value: 'commercial', label: '商空' },
  { value: 'office', label: '辦公室' },
]

export const MATERIAL_UNITS: materialUnitSelection[] = [
  {
    section: 'length',
    item: [
      { value: 'millimeter', label: 'mm' }, // 最常用於細部尺寸標註（木作、玻璃）
      { value: 'centimeter', label: 'cm' }, // 家具、門窗、牆面間距
      { value: 'meter', label: 'm' }, // 空間規劃、大範圍測量
      { value: 'inch', label: 'in' }, // 國外建材與五金尺寸
      { value: 'foot', label: 'ft' }, // 美制單位，部分建材會用
      { value: 'chi', label: '尺' }, // 傳統建築單位（約 30.3 cm）
      { value: 'cun', label: '寸' }, // 傳統細部尺寸（約 3.03 cm）
    ],
  },
  {
    section: 'area',
    item: [
      { value: 'squareCentimeter', label: 'cm²' }, // 小範圍面積計算（裝飾材料）
      { value: 'squareMeter', label: 'm²' }, // 地板、壁面、天花板等面積計算
      { value: 'ping', label: '坪' }, // 台灣常用面積單位（1坪 ≈ 3.3m²）
      { value: 'squareFoot', label: 'ft²' }, // 美制面積單位（商業案場可能會用）
    ],
  },
  {
    section: 'volume',
    item: [
      { value: 'cubicCentimeter', label: 'cm³' }, // 精細材料計算（如樹脂、填縫劑）
      { value: 'cubicMeter', label: 'm³' }, // 木材、混凝土、鋼構等體積計算
      { value: 'cai', label: '才' }, // 木材、石材體積計算
      { value: 'liter', label: 'L' }, // 塗料、黏著劑、溶劑等計算
      { value: 'milliliter', label: 'mL' }, // 精準計量（如化學藥劑、黏著劑）
    ],
  },
  {
    section: 'weight',
    item: [
      { value: 'gram', label: '克' }, // 小型建材與配件重量
      { value: 'kilogram', label: '公斤' }, // 石材、鋼材、木料等重量計算
      { value: 'metricTon', label: '公噸' }, // 大量建材（如砂石、水泥）
    ],
  },
  {
    section: 'quantity',
    item: [
      { value: 'ba', label: '把' }, // 門把、五金工具
      { value: 'cai', label: '才' }, // 建材（與體積計算的「才」不同）
      { value: 'zhu', label: '株' }, // 木料、柱子
      { value: 'pan', label: '爿' }, // 門板、木板
      { value: 'die', label: '疊' }, // 磁磚、瓦片
      { value: 'piece', label: 'pcs' }, // 板材、燈具、五金等
      { value: 'roll', label: 'roll' }, // 壁紙、隔音棉、捲狀建材
      { value: 'set', label: 'set' }, // 衛浴設備、門五金等整組產品
      { value: 'bag', label: 'bag' }, // 水泥、石膏粉等包裝材料
      { value: 'box', label: 'box' }, // 磁磚、螺絲等包裝計量
      { value: 'carton', label: 'ctn' }, // 大量出貨用紙箱計算
      { value: 'coil', label: 'coil' }, // 電線、鋼索等捲狀材料
      { value: 'pair', label: 'pair' }, // 門把、支架等成對產品
    ],
  },
  {
    section: 'construction',
    item: [
      { value: 'hour', label: 'hr' }, // 工程計價
      { value: 'day', label: '天' }, // 工期計算
      { value: 'personDay', label: '人' }, // 人工計算
      { value: 'load', label: '趟' }, // 車輛運輸材料的計算單位
    ],
  },
]
