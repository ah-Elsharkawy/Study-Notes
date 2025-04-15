# Row vs. Column Storage + Compression

> [!tip] Database workloads
>
> - ![alt text](image-19.png)
> - ![alt text](image-20.png)

> [!tip] OLTP
>
> ![alt text](image-21.png)

> [!tip] OLAP
>
> ![alt text](image-22.png)

<div style="page-break-before: always;"></div>

> [!tip] Storage Models
>
> ![alt text](image-23.png)

<div style="page-break-before: always;"></div>

> [!tip] NSM (N-ary Storage Model)
>
> - ![alt text](image-24.png)
> - ![alt text](image-25.png)
> - ![alt text](image-26.png)

<div style="page-break-before: always;"></div>

> [!tip] DSM (Decomposition Storage Model)
>
> - ![alt text](image-27.png)
> - ![alt text](image-28.png)
> - ![alt text](image-29.png)

<div style="page-break-before: always;"></div>

> [!tip] Tuple Identification
>
> In fixed length tuples, The position of a value in a column implicitly determines its corresponding row, but what about variable length tuples?
> Another approach is to use a tuple identifier (TID) to identify the row that a value belongs to, but this requires additional storage and not recommended.
>
> - ![alt text](image-30.png)

> [!tip] Variable Length Tuples
>
> If we have variable length tuples, we can use a diferent approach which is **Dictionary Encoding** where we store the unique values in a dictionary and then store the index of the value in the dictionary in the column.
>
> - ![alt text](image-32.png)
> - ![alt text](image-31.png)
>
> Note that in case of having a blob type in the columnar DB we can store the blob in a separate file and store the file path in the column, that's considered a good practice.

<div style="page-break-before: always;"></div>

> [!tip] PAX (Partition Attributes Across)
>
> Keep in mind that Parquet and ORC are Immutable, so if you want to update a record you have to rewrite the whole file.
> ![alt text](image-33.png)

> [!tip] Database Compression
>
> I/O is the bottleneck in databases, so DBMSs can compress the pages to increase the data moved during I/O operations.
>
> - ![alt text](image-34.png)
>   lossless compression is necessary, but in case of lossy compression, it has to be done by humans.
>   The explanation in the above image is pretty much what the instructor said, but He also mentioned that more details about the compression algorithms will be covered in few weeks.

<div style="page-break-before: always;"></div>

> [!tip] Compression Granularity
>
> It means how much data we compress at once, it can be a page, a block, a column, or a row.
>
> - ![alt text](image-35.png)

<div style="page-break-before: always;"></div>

> [!tip] MYSQL Innodb Compression
>
> In Innodb, we have the compressed pages with size that is configured by the user, if there is write operation on a page, the page will be moved to the buffer pool and make a write operation on it without decompressing it (not always), but if the page is read, it will be decompressed and then read.
>
> - ![alt text](image-38.png)
> - ![alt text](image-36.png)
> - ![alt text](image-37.png)

<div style="page-break-before: always;"></div>

> [!note] Decompressing the data before reading it is called **Naïve Decompression**, what we want to do is to operate on the data without decompressing it.
>
> ![alt text](image-39.png)
> The above compression is only aplicable on the Column-level compression granularity.

> [!tip] Columnar Compression
>
> ![alt text](image-40.png)

<div style="page-break-before: always;"></div>

> [!tip] Run Length Encoding (RLE)
>
> - Run Length Encoding is a simple compression algorithm that works by replacing sequences of the same value with a triple (value, offset, length).
> - This algorithm requires the columns to be sorted intelligently to maximize the compression opportunities.
> - ![alt text](image-41.png)

<div style="page-break-before: always;"></div>

> [!tip] Bit Packing
>
> - Bit Packing works by reducing the size of the values in the column by packing them into a smaller number of bits, e.g. if we have a column of integers that stores values between 0 and 15, we can store them in 4 bits instead of 8 bits.
> - ![alt text](image-42.png)
> - ![alt text](image-43.png)
>   The problem with bit packing is when having some values that are too large to fit in the compression size, in this case, we can use a hybrid approach called **Patching / Mostly Encoding** where we store the values that are too large (outliers) in a seperate offset column.
> - ![alt text](image-44.png)

<div style="page-break-before: always;"></div>

> [!tip] Bitmap Encoding
>
> ![alt text](image-45.png)
>
> - Bitmap encoding is used when we have a column with a small number of distinct values, it works by creating a bitmap for each value in the column where the bit is set if the value is present in the row.
> - Bimap is not recommended for columns with high cardinality (a large number of distinct values) because it will consume a lot of space.

> [!tip] Delta Encoding
>
> ![alt text](image-47.png)

<div style="page-break-before: always;"></div>

> [!tip] Dictionary Encoding
>
> Dictionary compression is a technique that replaces frequently occurring values (or patterns) with shorter codes using a dictionary (lookup table). Instead of storing the full data repeatedly, it stores references to a predefined dictionary, reducing storage space.
>
> - ![alt text](image-48.png)

![alt text](image-49.png)
