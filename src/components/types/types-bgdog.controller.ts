export interface IBgResShield {
    str(id: string): string;        // Get resource string from bkg script
    url(res: string): string;       // Get concatenated URL with base and avoid '//' during concatenation.
    res(id: string): string;        // Get additional resource, like CSS or HTML
}
