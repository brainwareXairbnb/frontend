import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

/**
 * Export data as CSV file
 * Works on both web and native platforms
 */
export async function exportToCSV(
  data: any[],
  filename: string,
  headers: { [key: string]: string }
) {
  if (!data || data.length === 0) {
    throw new Error('No data to export');
  }

  // Generate CSV content
  const csvContent = generateCSV(data, headers);

  // Check if running on native platform
  const isNative = Capacitor.isNativePlatform();

  if (isNative) {
    // Native platform - use Capacitor Filesystem and Share
    await exportCSVNative(csvContent, filename);
  } else {
    // Web platform - use browser download
    exportCSVWeb(csvContent, filename);
  }
}

/**
 * Generate CSV string from data
 */
function generateCSV(data: any[], headers: { [key: string]: string }): string {
  // Extract header keys and labels
  const keys = Object.keys(headers);
  const headerLabels = Object.values(headers);

  // Create CSV header row
  const csvHeaders = headerLabels.join(',');

  // Create CSV data rows
  const csvRows = data.map(item => {
    return keys.map(key => {
      const value = getNestedValue(item, key);
      // Escape and quote values that contain commas, quotes, or newlines
      if (value === null || value === undefined) return '';
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    }).join(',');
  });

  // Combine headers and rows
  return [csvHeaders, ...csvRows].join('\n');
}

/**
 * Get nested object value by path (e.g., 'user.name')
 */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Export CSV on web platform
 */
function exportCSVWeb(csvContent: string, filename: string) {
  // Add UTF-8 BOM (Byte Order Mark) for Excel compatibility
  // This ensures Excel properly recognizes UTF-8 encoded characters like ₹
  const BOM = '\uFEFF';
  const csvWithBOM = BOM + csvContent;

  // Create blob with UTF-8 encoding
  const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });

  // Create download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  URL.revokeObjectURL(url);
}

/**
 * Export CSV on native platform (iOS/Android)
 */
async function exportCSVNative(csvContent: string, filename: string) {
  try {
    // Add UTF-8 BOM (Byte Order Mark) for Excel compatibility
    const BOM = '\uFEFF';
    const csvWithBOM = BOM + csvContent;

    // Write file to temporary directory
    const result = await Filesystem.writeFile({
      path: filename,
      data: csvWithBOM,
      directory: Directory.Cache,
      encoding: Encoding.UTF8,
    });

    // Get the file URI
    const fileUri = result.uri;

    // Share the file using native share sheet
    await Share.share({
      title: 'Export CSV',
      text: `Export: ${filename}`,
      url: fileUri,
      dialogTitle: 'Save CSV File',
    });
  } catch (error) {
    console.error('Error exporting CSV on native platform:', error);
    throw new Error('Failed to export CSV file');
  }
}

/**
 * Format currency for export
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Format date for export
 */
export function formatDateForExport(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date and time for export
 */
export function formatDateTimeForExport(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
