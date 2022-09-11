#!/bin/bash
for tbl in `ls *.sql`
do
sudo mysql linkupss_db <$tbl
done